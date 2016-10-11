import logging
import smtplib
from email.mime.text import MIMEText
import urllib2
import json

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from web.lib.base import BaseController, render
from web.lib.helpers import get_records_from_solr

import solr

import sys
if '../../workspace/indexing/src' not in sys.path:
	sys.path.insert(0, '../../workspace/indexing/src') # Add workspace files into path. TODO: Fix!

import solrconfig

log = logging.getLogger(__name__)

class CommentController(BaseController):

	def index(self):
		requests = request.params
		#if len( requests ) > 0: # a form has been submitted
		#    return self.send()

		c.http_host = ""

		if 'id' in requests:
			c.id = requests['id']

			sol = solr.SolrConnection( solrconfig.solr_urls['all'] )
			sol_response = sol.query( "id:uuid\:"+c.id , score=False, rows=1, start=0)

			if len( sol_response.results ) == 1 :
				manuscript = None

				obj = sol_response.results[0]
				manuscript = sol_response.results[0]

				if manuscript:

					c.record = manuscript
					c.repository = None

					c.comment = ''
					c.messages = {}
					c.name = ''
					c.email = ''
					c.http_host = request.url

					return render('/main/comment.mako')

		return redirect( url(controller='home') )

	def send(self):
		requests = request.params

		if 'id' in requests and requests['id'] != '' :

			records = get_records_from_solr( [ requests['id'] ] )
			if len(records) > 0:

				record = records[requests['id']]

				name_good = CommentController._name_good( requests )
				email_good = CommentController._email_good( requests)
				comment_good = CommentController._comment_good( requests )
				captcha_good = CommentController._captcha_good( requests )


				if email_good and comment_good and name_good and captcha_good :

					email_body = ''
					email_body += "Email via EMLO website\n"
					email_body += "======================\n"
					email_body += "\n"
					email_body += "Comment on record: "
					email_body += " http://emlo.bodleian.ox.ac.uk/profile/" + record['object_type'] + "/" + record['id'].replace("uuid:", '') + '\n'
					email_body += "\n"
					email_body += "From: " + requests['name'] + "\n"
					email_body += "Email: " + requests['email'] + "\n"
					email_body += "Message follows:\n" + requests['comment'] + "\n\n"

					self._sendmail( 'emlo@bodleian.ox.ac.uk', email_body )

					return redirect( url(controller='thanks', action='index') + '?id=' + record['id'].replace("uuid:", '') )

				else:

					c.record = record
					c.comment =  requests.get( 'comment', '' )
					c.name =   requests.get( 'name', '' )
					c.email =   requests.get( 'email', '' )

					messages = {}

					if not name_good :
						messages['name'] = 'Please enter your name.'

					if not email_good:

						if not CommentController._have( "email", requests ) :
							messages['email'] = 'Please enter an email address.'
						elif not CommentController._email_valid( requests ):
							messages['email'] = "Sorry, that doesn't appear to be a valid email address."

					if not comment_good:
						messages['comment'] = 'Please enter a comment.'

					if not captcha_good :

						if not  CommentController._have( "g-recaptcha-response", requests ) :
							messages['captcha'] = "Sorry, the Captcha input failed to load, Please can you try again later."
						else:
							messages['captcha'] = "Please complete the captcha."

					if len( messages ) == 0 :
						messages['general'] = "Sorry, there was unknown error and we couldn't send your comment. Please check your details."

					c.messages = messages

					return render('/main/comment.mako')#?id=' + record['id'].replace('uuid:',''))

		return redirect( url(controller='home') )


	@staticmethod
	def _email_good( requests ):
		return CommentController._have( 'email', requests ) and CommentController._email_valid( requests )

	@staticmethod
	def _email_valid( requests ):
		return CommentController._have( 'email', requests ) and '@' in requests['email'] and '.' in requests['email']

	@staticmethod
	def _name_good( requests ):
		return CommentController._have( 'name', requests )

	@staticmethod
	def _comment_good( requests ):
		return CommentController._have( 'comment', requests )

	@staticmethod
	def _have( key, requests ):
		return key in requests and requests[key].strip() != ''



	@staticmethod
	def _captcha_good( requests ):

		if CommentController._have( 'g-recaptcha-response', requests ) :

			# check recaptcha
			# call https://www.google.com/recaptcha/api/siteverify?secret=your_secret&response=response_string&remoteip=user_ip_address
			secretkey = '6LciPgATAAAAAGmWHg0co8ddZLgK_g95FhW4pqSW'
			captcha_url = 'https://www.google.com/recaptcha/api/siteverify?secret=' + secretkey + '&response=' + requests['g-recaptcha-response'] +'&remoteip=' + request.environ['REMOTE_ADDR']

			url_response = urllib2.urlopen( captcha_url )
			json_response = url_response.read()
			captcha_response = json.loads( json_response )

			return captcha_response['success']

		return False


	@staticmethod
	def _sendmail(addressto,body):

		requests = request.params
		fromaddr = requests.get('email','')
		toaddr = addressto

		msg = MIMEText(body)
		msg['Subject'] = 'A comment from EMLO record'
		msg['From'] = fromaddr
		msg['To'] = toaddr

		s = smtplib.SMTP("smtp.ox.ac.uk")
		#s.set_debuglevel(1)
		s.sendmail(fromaddr, [toaddr], msg.as_string())
		s.quit()


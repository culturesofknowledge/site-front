# -*- coding: utf-8 -*-
<%!
   nav_selected = 'about'
   main_title = 'about'
%>
<%inherit file="/base.mako" />

<%def name="for_head()">
	<style>
		@media only screen and (min-width: 64.063em) {  /* min-width 1025px, large screens */
			.side {
					position: fixed;
					width: 250px; /* Not sure why is needed...*/
			}
		}
	</style>
</%def>

<%def name="for_foot()">
</%def>

<%def name="body()">

		<div class="row">
			<div class="columns small-12 large-3 side">

				<h2>Navigate</h2>
				  <ul class="side-nav">
					  <li><a href="#context">Context</a></li>
					<li><a href="#citation">Citation Guidelines</a></li>
					<li><a href="#copyright">Copyright and Scholarly Responsibility</a></li>
					<li><a href="#issues">Known Issues</a></li>
					<li><a href="#credits">Credits</a></li>
					<li><a href="#technical">Technical Overview</a></li>
                    <li><a href="#cookies">Cookies</a></li>
					<li><a href="#contact">Contact</a></li>
				  </ul>

			</div>

			<div class="columns small-12 large-9">
				<br/>

				<h2 id="about">About</h2>
				<br/>

				<p>Early Modern Letters Online is a combined finding aid and editorial interface for basic descriptions of early modern correspondence: a collaboratively populated union catalogue of sixteenth-, seventeenth-, and eighteenth-century letters. <strong>EMLO is an active project in continual development:</strong> please let us know what you think, and get involved!</p>


				<hr class="yellow-divider">


				<h3 id="context">Context</h3>

				<p>Early Modern Letters Online and its underlying editorial environment — <a href="http://emlo-edit.bodleian.ox.ac.uk/interface/union.php" target="_blank">EMLO Edit</a> — was built in less than two years by developers from <a href="http://www.bodleian.ox.ac.uk/sers" target="_blank">Bodleian Digital Library Systems and Services</a> (BDLSS), and it continues to be developed and enhanced. It was created under the auspices of Phase I (2009–2012) of <a href="http://www.culturesofknowledge.org" target="_blank">Cultures of Knowledge</a>, a collaboration between the <a href="http://www.bodleian.ox.ac.uk" target="_blank">Bodleian Library</a> and the <a href="http://www.humanities.ox.ac.uk" target="_blank">Humanities Division</a> of the <a href="http://www.ox.ac.uk" target="_blank">University of Oxford</a> with generous funding from <a href="http://www.mellon.org" target="_blank">The Andrew W. Mellon Foundation</a>. It has been developed in the conviction that the digital revolution of recent decades can provide tools which greatly facilitate study of the communications revolution of the early modern era, and that a central, web-based inventory of early modern letters is needed to enable scholars to navigate the ocean of correspondence from the period. <strong>Bringing manuscript, print, and electronic resources together in one space not only increases access to and awareness of them, but allows disparate and connected correspondences to be cross-searched, combined, analysed and visualized. Moreover, the collection of unprecedented quantities of metadata, and the standardization of the means of describing and processing them, is the precondition for efficient collaborative work on the development of new digital tools, new scholarly methods, and new historiographical insights in this large and central field.</strong> From Phase II (2013–2015) onwards, Cultures of Knowledge is turning outward and focusing more on what we can offer our community of contributors as well as our catalogue users, thereby transforming EMLO into a resource, a platform, and a toolset. For full details of our activities — including prosopographical pilot projects, a visualization agenda, and outreach events — please visit the <a href="http://www.culturesofknowledge.org" target="_blank">project website</a>.</p>


				<hr class="yellow-divider">


				<h3 id="citation">Citation Guidelines</h3>

				<p>Correct citation is vital for responsible scholarship and to ensure that online resources are credited appropriately when they are used, in the same manner as print resources. As there are various resources hosted on EMLO, with various contributors, please follow the guidelines below when citing your use of EMLO.</p>
				<br>

				<h4>How to cite the EMLO website as a whole</h4>

				<p><em>Early Modern Letters Online</em>, Cultures of Knowledge, http://emlo.bodleian.ox.ac.uk, date accessed.</p>
				<br>

				<h4>How to cite a whole catalogue in EMLO</h4>

				<p>If you wish to cite a whole catalogue, please consult that individual catalogue’s accreditation page (linked from <a href="http://emlo.bodleian.ox.ac.uk/blog/?page_id=480" target="_blank">here</a>) to find out who has compiled the data. The catalogue may have been compiled by more than one project or individual. If there are too many contributors to cite reasonably, please prioritise those listed in the ‘Primary Contributors’ section of the accreditation page and append ‘et al.’. When citing a catalogue, the format is: <strong>Name of contributing project/editor(s) if applicable, ed. [or eds], ‘Name of Catalogue’, in <em>Name of Resource</em>, Name of host/resource creator, URL of catalogue accreditation page, date accessed.</strong> For example:</p>
				<p>Anna Marie Roos ed., ‘The Correspondence of Martin Lister’, in <em>Early Modern Letters Online</em>, Cultures of Knowledge, http://emlo.bodleian.ox.ac.uk/blog/?catalogue=martin-lister , accessed 29 Aug 2014.</p>
				<br>

				<h4>How to cite an individual item in EMLO</h4>

				<p>Many scholars use EMLO as a finding aid for further research; if you consult external resources linked out to from EMLO, please cite those resources. If you are citing specific EMLO content, please follow the guidelines below. When citing a record, the structure is: <strong>Title of the record, in [EMLO reference, as above]</strong>, along with additional ID numbers and names of contributors, where relevant. For example:</p>
				<p>A person record:<br>
				Wren, Christopher (1632–1723), in <em>Early Modern Letters Online</em>, Cultures of Knowledge, URL of record, ID 1234, accessed 29 Aug 2014.</p>
				<p>A letter record (see also whole catalogue, above):<br>
				Author name to Recipient name, date of letter, in Name of contributing project/editor(s) if applicable, ed. [eds], ‘Name of Catalogue’, in <em>Early Modern Letters Online</em>, Cultures of Knowledge, URL of record, ID 1234, accessed 29 Aug 2014.</p>
				<p>A translation or transcription hosted by EMLO:<br>
				Author name to Recipient name, date of letter, translation by Name of Translator, in <em>Early Modern Letters Online</em>, Cultures of Knowledge, URL of item, accessed 29 Aug 2014.</p>
				<p>A manuscript image hosted by EMLO:<br>
				Author name to Recipient name, date of letter, Name of Repository, Shelfmark or access number, image consulted on <em>Early Modern Letters Online</em>, Cultures of Knowledge, URL of item, accessed 29 August 2014.</p>
				<p>N.B. images, translations and transcriptions must not be reproduced without express permission by the relevant repository or author.</p><br>
				<p>A prosopographical entry (to be released 2015-16):<br>
				Name(s) of creator(s), Prosopography of Wren, Christopher (1632–1723), in <em>Early Modern Letters Online</em>, Cultures of Knowledge, URL of record, ID 1234, accessed 29 August 2014.</p>

				<hr class="yellow-divider">


				<h3 id="copyright">Copyright and Scholarly Responsibility</h3>
				<p>EMLO is provided free of charge for individual, non-commercial use only. Users are expected to respect the copyright of the holders of the original images and the creators of the transcriptions and translations (where these are provided). In particular, images of letter documents in the catalogue are reproduced under licence from the libraries and archives in possession of the originals (indicated clearly on image profile pages) and must not be reproduced or redistributed in any form without prior permission from the relevant repository.</p>

				<p>Where copyright exists (e.g. for images, transcriptions/translations, database rights, and calendars of correspondence), copyright remains with the respective individuals and projects responsible for generating them. Please see our citation guidelines and the primary contributor information provided on the individual <a href="http://emlo.bodleian.ox.ac.uk/blog/?page_id=480">catalogue</a> pages. </p>

				<p>The data in EMLO is protected by database rights; it is not permissible to scrape or download bulk data from EMLO or to use it in third-party tools without explicit permission. If you would like to use EMLO data in this way, please get in touch. During visualization work planned for 2015-16, all catalogue contributors to EMLO will be given the choice to embargo their data from third-party use, or to release their data under the auspices of a widely recognizable and machine-readable Creative Commons License, to allow for attributed reuse and analysis. Further details will be made available as developments require.</p>

				<p>EMLO is a project built on cooperation and provides a scholarly platform and resource for its contributors as well as its catalogue users. As such, we see it as our responsibility to outline and abide by ethical and scholarly principles, and these are outlined in their first iteration below (2015):</p>

				<ol>
					<li>Full and explicit credit to the original collector(s) will be provided for all metadata published on EMLO.</li>
					<li>All data (transcriptions/translations/images) published on EMLO will also be fully acknowledged and properly cited, and additional permission sought where necessary from copyright holders.</li>
					<li>Where appropriate, formal recognition will be given to technical as well as scholarly contributors to the project.</li>
					<li>Disputed data/metadata will be clearly marked as such.</li>
					<li>Editorial responsibility for calendars resides in the first instance with the data contributor or source. If data is cleaned, corrected, and/or amended, EMLO undertakes editorial responsibility for those changes.</li>
					<li>EMLO works with the agreement of copyright owners when adding copyrighted data to the union catalogue. In difficult situations, such as unclear copyright or defunct publishers, every reasonable attempt will be made to contact relevant parties to seek their collaboration and full support. </li>
					<li>Where a work is out of copyright and/or copyright does not reside in the data, every effort will nevertheless be made to contact the original author/publisher of the source.  Full credit and provenance information will always be given to that source.</li>
					<li>In the event of a dispute, EMLO can remove data from the system.</li>
				</ol>

                <hr class="yellow-divider">


                <h3 id="issues">Known Issues</h3>

                <p>EMLO is an active, collaborative project in continual development.  As such, problems are liable to arise within it on an ongoing basis, including functional glitches as well as errors and inconsistencies in the published data. Please be in touch should you notice anything erroneous or faulty, but rest assured that our team is working hard to make our data and our platform as problem-free as possible! </p>

                <p>As our catalogue grows, we grapple with new issues raised by uploading metadata from disparate sources. This might result in the occasional error or in inconsistencies in referencing practice that we’ve not yet resolved. At the current state of development, for instance, it is still possible that the same letter will appear in two contributing catalogues, leading to double-counting of all the overlapping metadata and erroneous results in the browse screens. Additionally, live people and place records may include in their catalogue statistics totals letter records that are soon to be published but not yet available. We are planning a long-term resolution of this issue from 2015, so please bear with us.</p>

                <p>Finally, our work on prosopography is still in its early stages, and therefore any publication of this data during 2015 should be regarded as an advanced prototype for future work. Although the factual content has been researched meticulously, the presentation of this data and its functionality may well go through several iterations before the prosopographical pilot projects are integrated seamlessly into EMLO.</p>

                <hr class="yellow-divider">


                <h3 id="credits">Credits</h3>


				<p>EMLO is a genuinely collaborative effort amongst the Project's committed <a href="http://www.culturesofknowledge.org/?page_id=5" target="_blank">team</a> of designers, developers, editors, librarians, managers, researchers, and systems developers. Editorial and scholarly credits for our individual contributing catalogues may be found on the <a href="/emlo_collections">Catalogue</a> pages. The software for the prototype catalogue and its editorial interface has been created by colleagues from <a href="http://www.bodleian.ox.ac.uk/sers" target="_blank">BDLSS</a> of <a href="http://www.bodleian.ox.ac.uk" target="_blank">Bodleian Libraries</a>. Our founding developer, <a href="http://www.history.ox.ac.uk/cofk/about/participants#burgess" target="_blank">Sue Burgess</a>, helped specify <a href="https://emlo-edit.bodleian.ox.ac.uk/interface/union.php" target="_blank">EMLO-Edit</a>, hand-coded it from scratch, and helped knock the front-end functionality into shape after the private alpha launched in 2010. The mantle of lead developer was then taken up by <a href="http://www.culturesofknowledge.org/?page_id=5/#alumni" target="_blank">Renhart Gittens</a> from 2013–14, who did the foundational work on the EMLO-Collect webform. <a href="http://monicams.com" target="_blank">Monica Messaggi Kaya</a>, our designer, was responsible for the catalogue's look and feel and worked tirelessly on its re-design in 2014. <a href="http://akademy.co.uk/me" target="_blank">Matthew Wilcoxson</a> enhanced front-end functionality and built the first prototype (which also benefited from additional coding from Anusha Ranganathan), and in Phase II has done sterling work on both back end functionality and the re-design. We also have Mat to thank for EMLO’s people bar charts, which he initially implemented with <a href="http://www.scottbot.net/blog/" target="_blank">Scott Weingart</a> from Indiana University. Dr Iva Lelkova and Dr Robin Buning, our two postdocs, worked from 2013–15 on CofK’s <a href="http://www.culturesofknowledge.org/?page_id=31">prosopographical pilot projects</a>.  Digital Engineer <a href="http://www.culturesofknowledge.org/?page_id=5/#technologists" target="_blank">Tanya Gray Jones</a> continues to contribute fundamental technical work to this new area, including the definition of a semantic data model, the development of a semantically enriched input form, and enabling the process of data capture to data upload. From the outset of CofK in 2009, overall technical direction has been provided by the Project’s Technical Strategist, <a href="http://www.culturesofknowledge.org/?page_id=5/#technologists" target="_blank">Neil Jefferies</a>, who also manages the deeper Bodleian-based infrastructure within which EMLO sits. Coordination and project management has been provided in Phase II by <a href="http://www.culturesofknowledge.org/?page_id=5" target="_blank">Dr Elizabeth Williamson</a>, and in Phase I by <a href="http://www.history.ox.ac.uk/cofk/about/participants#brown" target="_blank">Dr James Brown</a>, with assistance from <a href="http://www.history.ox.ac.uk/cofk/about/participants#mclean-fiander" target="_blank">Dr Kim McLean-Fiander</a>, <a href="http://www.history.ox.ac.uk/cofk/about/participants#cooper" target="_blank">Erin Cooper</a>, and <a href="http://christinemadsen.com/" target="_blank">Dr Christine Madsen</a>. Overall leadership of the project rests with our Director <a href="http://www.culturesofknowledge.org/?page_id=5" target="_blank">Professor Howard Hotson</a>. Our expert editor <a href="http://www.culturesofknowledge.org/?page_id=5" target="_blank">Miranda Lewis</a> has taken leadership on all things editorial since the outset of the project, and is now supported in editorial tasks by our team of <a href="http://www.culturesofknowledge.org/?page_id=5/#digitalfellows" target="_blank">Digital Fellows</a>, whose tireless devotion and wonderful energy is an indispensable contribution to the project as a whole. </p>

				<p>The founding Steering Committee was indispensable to the establishment and earliest phases of the project.  Professor Pietro Corsi provided the initial conception and oversaw the crucial planning stages.  Dr Will Poole was particularly forthcoming with suggestions, initiative and resources.  Dr Robert McNamee kicked off development of EMLO’s data model by sharing the standards developed by the Electronic Enlightenment.  Professor Richard Sharpe played the lead role in tailoring the model for and implementing it on EMLO.  Michael Popham oversaw the scanning and keying of the Bodleian’s card catalogue of manuscript correspondence.  Professor Peter Harrison initially chaired the Steering Committee: since his return to Australia this responsibility has been shouldered by Sir Noel Malcolm.  As the founding Project Manager of Cultures of Knowledge, Dr James Brown made a massive contribution to the origin and early development of EMLO.</p>

				<p>Special thanks are also due to colleagues and collaborators from our first phase of activities (2009–2012), including but not limited to our fantastic Phase I Steering Committee; our inaugural scholarly editors; the <a href="http://www.shef.ac.uk/hri/" target="_blank">Humanities Research Institute</a> of the <a href="http://www.shef.ac.uk/" target="_blank">University of Sheffield</a>, especially <a href="http://www.history.ox.ac.uk/cofk/about/participants#greengrass" target="_blank">Professor Mark Greengrass</a>, Michael Pidd, and Jamie McLaughlin; the <a href="http://www.wales.ac.uk/en/CentreforAdvancedWelshCelticStudies/IntroductiontotheCentre.aspx">Centre for Advanced Welsh and Celtic Studies</a> at the University of Wales, Dr Brynley F. Roberts, and Professor Dafydd Johnston; the <a href="http://komeniologie.flu.cas.cz/aktuality.php">Department of Comenius Studies</a> in the Institute of Philosophy of the Academy of Sciences of the Czech Republic (Prague), especially Dr Vladimír Urbánek; <a href="http://republicofletters.stanford.edu/" target="_blank">Mapping the Republic of Letters</a> (Stanford); <a href="http://ckcc.huygens.knaw.nl/" target="_blan">Circulation of Knowledge and Learned Practices in the Seventeenth-Century Dutch Republic</a> (The Hague); and to the <a href="http://www.e-enlightenment.org/" target="_blank">Electronic Enlightenment Project</a> (Oxford) for their generous advice and support at the outset of our activities. </p>

				<p>The sources of image details used in the news section can be found on the linked catalogue pages, with the exception of an image of letters, credited here: Detail of Trompe l’oeil, by Cornelis Norbertus Gysbrechts. 1675. (Wallraf-Richartz-Museum; source of image Wikimedia Commons)</p>


                <hr class="yellow-divider">

                <h3 id="technical">Technical Overview</h3>

				<p>EMLO runs on the Bodleian digital object management and preservation platform, designed to support digital library projects within the University of Oxford (notably <a href="http://www.bodleian.ox.ac.uk/ora" target="_blank">Oxford University Research Archive</a>). This provides a flexible platform that is able to accommodate a wide variety of file formats and metadata standards that readily scales to high data volumes. The core EMLO object model allows contributors to provide rich metadata on five epistolary entities — letters, manifestations (different archival and printed versions of the same letter), agents (people and organizations), locations, and repositories that are interlinked using RDF-compatible ontologies. Contributions are uploaded initially into EMLO-Collect via spreadsheet, direct data entry, or from a data collection tool, which allow contributors to make corrections before submission to the editorial team. Submitted data is then ingested into a powerful 'back-end' database — <a href="https://emlo-edit.bodleian.ox.ac.uk/interface/union.php" target="_blank">EMLO-Edit</a>, based on PostgreSQL — where it can be enhanced and de-duplicated by the editorial team using a powerful suite of web-based editing and merging tools. Publication-ready data is released to a front end — you're using this now — built with Python/Pylons, which provides a set of discovery services that provide full text indexing and faceted search (<a href="http://lucene.apache.org/solr/" target="_blank">Apache Solr</a>). </p>

                <hr class="yellow-divider">


                <h3 id="cookies">Cookies</h3>

                <p>This website stores cookies for use in Google Analytics, which anonymously tracks individual visitor behaviour on the website so that we can see how the site is being used. We only use this information for monitoring and improving our website and content for the benefit of our users.</p>

                <p>More information about controlling these cookies can be found at <a href="http://www.bodleian.ox.ac.uk/cookies" target="_blank">The Bodleian Libraries and Cookies page</a>.</p>

                <p>You can opt out of Google Analytics cookies completely (from all websites) by visiting <a href="https://tools.google.com/dlpage/gaoptout" target="_blank">Google Analytics Opt-out Browser Add-on</a>.<br>If you wish to have a deeper understanding about the cookies that Google uses check <a href="https://developers.google.com/analytics/resources/concepts/gaConceptsCookies" target="_blank">Cookies &amp; Google Analytics page</a>.</p>

                <hr class="yellow-divider">


                <h3 id="contact">Contact</h3><br>

				<p>Find details on current members of the team at our project website: <a href="http://www.culturesofknowledge.org">www.culturesofknowledge.org</a>, and sign up to the CofK<a href="http://culturesofknowledge.us1.list-manage.com/subscribe?u=ea9eeaa201daa1ead1d607e4b&id=4d56a55c06"> mailing list</a> to receive notifications when new catalogues are published.</p>

				<p>Email us at emlo(at)bodleian.ox.ac.uk</p>

				<p>Phone us on: +44(0)1865 615026</p>

				<p>Write to us at:<br/>
					<strong>Early Modern Letters Online</strong><br/>
					History Faculty<br/>
					University of Oxford<br/>
					George Street<br/>
					Oxford<br/>
					OX1 2RL
				<p>

				<p><a href="https://emlo.bodleian.ox.ac.uk">http://emlo.bodleian.ox.ac.uk</a></p>


			</div> <!-- large-9 columns -->

			
			

		
	</div><!-- row -->
</%def>

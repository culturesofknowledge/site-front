# -*- coding: utf-8 -*-
<%!
   nav_selected = 'contribute'
   main_title = 'Contibute'
%>
<%inherit file="/base.mako" />

<%def name="for_head()">
	<style>
		@media only screen and (min-width: 64.063em) {  /* min-width 1025px, large screens */
			.side {
				margin-top: 200px;
				border-top: 1px solid #efc319;
				border-bottom: 1px solid #efc319;
				padding-top: 15px;
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
				 <li><a href="#submit">Submit Existing Data</a></li>
				 <li><a href="#refine">Gather, Curate and Edit Your Data</a></li>
				 <li><a href="#share">Publish Your Data</a></li>
			   </ul>

			</div>


			<div class="columns small-12 large-9">
				<br>
				<h2>Contribute</h2><br>

					<p><strong>Early Modern Letters Online</strong> is a collaboratively populated resource now moving towards collaborative design and development. It has been designed as an open platform within which scholars, research projects, archives, and libraries can collate, store, publish, analyse, and visualize their epistolary data.  It is intended, therefore, to grow at the hands of a geographically dispersed community of contributors. </p>

					<p>Meeting the <strong>needs of contributors</strong> is central to the success of the project. Placing metadata in EMLO is intended to offer a variety of contributors a range of advantages. The most basic of these is the opportunity to archive their material on a ready made, easily accessible, permanent, and prominent site, designed to high scholarly standards, which they need not design, fund, build, or maintain. All metadata is accredited in full, and contributors retain editorial control over their material. As well as enhancing the discoverability of data both on the site and linked to from it, contribution facilitates the study of the ways in which individual correspondences evolve over time and interact with others. This study will be enhanced over the coming years with on-board analytical and visualization tools incorporated into EMLO in subsequent stages of development. The process of submitting and curating your data is intended to be as trouble-free as possible.</p>

					<p><strong>If you have metadata on early modern letters</strong>, we would like very much to <a href="/about#contact">hear from you</a>. You might be an individual, a research or editorial project, or an institution, considering the contribution of your own personal research spreadsheet, metadata from a scholarly edition, or a subsection from a library catalogue.</p>

					<p>The process of submitting data to EMLO is designed to be as simple and trouble-free as possible, whether you’re submitting existing data or starting from scratch — see below, and <a href="/about#contact">get in touch</a>!</p>

					<hr class="yellow-divider">

					<a name="submit"></a>

						<h3>1. Submit Existing Data</h3>

						<br>

						

					<p>If your collection is a good fit for the catalogue, you can submit it to EMLO in a number of different formats: please contact us to discuss options and details. Accuracy and editorial responsibility are vitally important to us. During the data-upload process, we ensure that you, the expert on your dataset, advise on questions that crop up as we match your particular dataset to our thousands of people and place records. At any stage you may enhance or work with your data, or add new records. Only when you are ready is your material published, with full accreditation on each record and a bespoke catalogue page providing detail on content, provenance, and collaborators.</p>

					<hr class="yellow-divider">

	              <a name="refine"></a> 

	              <h3>2. Gather, Curate and Edit Your Data</h3>

						<br>

						<p>If you're just starting to collect your metadata, we have tools that can help. EMLO has developed a variety of methods for harvesting a wide range of metadata on early modern letters. <a href="https://emlo-edit.bodleian.ox.ac.uk/interface/union.php" target="_blank">EMLO-Collect</a> is a secure and private platform within which you can gather and input your data via the quick-use Webform, developed in 2014, which allows you to input data on letters, people, and places quickly and easily in pre-standardized fashion, ready for publication on the union catalogue. When you have finished entering your dataset, you can pass it through editorial control into the main database, <a href="https://emlo-edit.bodleian.ox.ac.uk/interface/union.php" target="_blank">EMLO-Edit</a>, which is where your metadata sits until you’re ready to publish it and where it is accessible only via a controlled editorial gateway, thus protecting your work-in-progress metadata and shared entities such as people and places. The bespoke tools, forms, and files we have available for input may be used also to supplement catalogues already uploaded to EMLO.</p>


						<p>At every stage you can continue to work with your metadata, making whatever changes, enhancements, or corrections you wish. Effectively a bespoke content management system for early modern letters, EMLO-Edit is a powerful and user-friendly online publishing environment — designed by and for our researchers and editors — and it allows you to oversee refinement and annotation of your data in perpetuity across the full seventy fields of the EMLO object model and to upload transcriptions and images (with, of course, appropriate permissions), without exposure to underlying code. Everything versions (so nothing is lost), while audit trails, personal spreadsheet exports (not available to members of the public), and a host of other tracking services allow you to monitor and manage your collections with ease.</p>

					<hr class="yellow-divider">

					

			    <a name="share"></a><h3>3. Publish Your Data</h3>

				  <br>

						

						<p>When you're happy with your data in the hidden 'back end' of EMLO, it can be released at the click of a mouse to the public-facing user interface — the part of the catalogue you're in currently. This interface interrogates the metadata for end users by means of a sophisticated suite of search and discovery functions. Here, your correspondents, their letters, and their locations will mingle publicly with and enhance those of other denizens of the growing EMLO universe, yet your collection can always be consulted and interrogated individually. Record provenance (i.e. the name of the contributor) and the date of the last edit are flagged clearly on each of our records; you are welcome also to include links to related resources (perhaps your own project website or links to a hard-copy edition).  Every letter record links through also to your catalogue’s ‘front page’, on which full information on the provenance of the data is provided. This is where you may set out full details of the catalogue’s contents, images, links, logos, and acknowledgements, thereby providing a stable reference and information point for the collection as a whole. Subsequently, whenever you spot an error, would like to update information, add a record, or enrich your data in other ways, edits are only a click or two away and all you need to do is be in touch.</p>


		</div>
			

		

		
	</div><!--id:main-->
</%def>

/**
 * Created by matthew on 1/26/16.
 */
// Solr: http://127.0.0.1:8983/solr/works/select?indent=on&version=2.2&q=cito\%3ACatalog%3A*&fq=&start=0&rows=0&fl=*%2Cscore&qt=standard&wt=standard&explainOther=&hl.fl=&facet=true&facet.field=cito:Catalog&output=json

//select original_catalogue, count(original_catalogue) as count, min(date_of_work_std_year) as min, greatest(max(date_of_work_std_year),max(date_of_work2_std_year) ) as max from cofk_union_work
//group by original_catalogue
//ORDER BY count
var catalogueCounts = {
	"lst": {
		"-name": "cito:Catalog",
		"int": [
			{
				"-name": "Bodleian card catalogue",
				"#text": "48691"
			},
			{
				"-name": "Groot, Hugo de",
				"#text": "8034"
			},
			{
				"-name": "Huygens, Constantijn",
				"#text": "7120"
			},
			{
				"-name": "Hartlib, Samuel",
				"#text": "4718"
			},
			{
				"-name": "Andreae, Johann Valentin",
				"#text": "3696"
			},
			{
				"-name": "Huygens, Christiaan",
				"#text": "3080"
			},
			{
				"-name": "Kircher, Athanasius",
				"#text": "2696"
			},
			{
				"-name": "Graffigny, Françoise de",
				"#text": "2524"
			},
			{
				"-name": "Lhwyd, Edward",
				"#text": "2128"
			},
			{
				"-name": "Wallis, John",
				"#text": "2001"
			},
			{
				"-name": "Mersenne, Marin",
				"#text": "1904"
			},
			{
				"-name": "Peiresc, Nicolas-Claude Fabri de",
				"#text": "1843"
			},
			{
				"-name": "Scaliger, Joseph Justus",
				"#text": "1669"
			},
			{
				"-name": "Lister, Martin",
				"#text": "1212"
			},
			{
				"-name": "Oldenburg, Henry",
				"#text": "1203"
			},
			{
				"-name": "Aubrey, John",
				"#text": "1073"
			},
			{
				"-name": "Solms-Braunfels, Amalia von",
				"#text": "1016"
			},
			{
				"-name": "Bourignon, Antoinette",
				"#text": "940"
			},
			{
				"-name": "Descartes, René",
				"#text": "727"
			},
			{
				"-name": "Gray, Thomas",
				"#text": "651"
			},
			{
				"-name": "Comenius, Jan Amos",
				"#text": "566"
			},
			{
				"-name": "Barlaeus, Caspar",
				"#text": "505"
			},
			{
				"-name": "Brahe, Tycho",
				"#text": "498"
			},
			{
				"-name": "Sidney, Philip",
				"#text": "380"
			},
			{
				"-name": "Selden, John",
				"#text": "355"
			},
			{
				"-name": "Polanus von Polansdorf, Amandus",
				"#text": "325"
			},
			{
				"-name": "Pontanus, Johannes Isacius",
				"#text": "321"
			},
			{
				"-name": "Czech students in Protestant universities (Hrubý)",
				"#text": "290"
			},
			{
				"-name": "Leeuwenhoek, Antoni van",
				"#text": "282"
			},
			{
				"-name": "Kepler, Johannes",
				"#text": "274"
			},
			{
				"-name": "Gamba collection",
				"#text": "261"
			},
			{
				"-name": "Swammerdam, Jan",
				"#text": "172"
			},
			{
				"-name": "Sachs von Löwenheim, Philipp Jakob",
				"#text": "143"
			},
			{
				"-name": "Fermat, Pierre de",
				"#text": "121"
			},
			{
				"-name": "Tixall letters",
				"#text": "95"
			},
			{
				"-name": "Permeier, Johann",
				"#text": "89"
			},
			{
				"-name": "Franckenberg, Abraham von",
				"#text": "85"
			},
			{
				"-name": "Nierop, Dirck Rembrantsz van",
				"#text": "80"
			},
			{
				"-name": "Kircher-related correspondence",
				"#text": "55"
			},
			{
				"-name": "Schott, Caspar",
				"#text": "39"
			},
			{
				"-name": "Beeckman, Isaac",
				"#text": "28"
			},
			{
				"-name": "Baxter, Richard",
				"#text": "8"
			},
			{
				"-name": "No catalogue specified",
				"#text": "3"
			}
		]
	}
};

// select catalogue_name, count(original_catalogue) as count, min(date_of_work_std_year) as min, greatest(max(date_of_work_std_year),max(date_of_work2_std_year) ) as max from cofk_union_work
// LEFT JOIN cofk_lookup_catalogue ON cofk_union_work.original_catalogue = cofk_lookup_catalogue.catalogue_code
// where cofk_lookup_catalogue.publish_status=1
// group by catalogue_name
// ORDER BY catalogue_name
var catalogueCountsAndDates = [
	["Andreae, Johann Valentin",3715,1630,1654],
	["Aubrey, John",1073,1636,1696],
	["Barlaeus, Caspar",505,1615,1647],
	["Baxter, Richard",8,1657,1659],
	["Beeckman, Isaac",28,1612,1635],
	["Bodleian card catalogue",54620,1508,1829] , // edited from 1900 to 1829
	["Brahe, Tycho",500,1568,1601],
	["Comenius, Jan Amos",624,1622,1670],
	["Descartes, René",727,1619,1650],
	["Fermat, Pierre de",125,1630,1664],
	["Franckenberg, Abraham von",85,1617,1652],
	["Gamba collection",261,1566,1837],
	["Graffigny, Françoise de",2524,1716,1759],
	["Gray, Thomas",651,1734,1771],
	["Groot, Hugo de",8034,1594,1645],
	["Hartlib, Samuel",4833,1620,1662],
	["Huygens, Christiaan",3080,1636,1695],
	["Huygens, Constantijn",7120,1608,1687],
	["Kircher, Athanasius",2731,1632,1681],
	["Kircher-related correspondence",55,1592,1677],
	["Leeuwenhoek, Antoni van",282,1673,1707],
	["Lhwyd, Edward",2164,1674,1709],
	["Lister, Martin",1214,1660,1710],
	["Mersenne, Marin",1904,1617,1650],
	["Nierop, Dirck Rembrantsz van",80,1653,1684],
	["No catalogue specified",12,1615,1688],
	["Peiresc, Nicolas-Claude Fabri de",1849,1602,1639],
	["Permeier, Johann",89,1637,1641],
	["Pontanus, Johannes Isacius",321,1595,1639],
	["Sachs von Löwenheim, Philipp Jakob",149,1648,1672],
	["Scaliger, Joseph Justus",1669,1561,1609],
	["Schott, Caspar",28,1656,1665],
	["Selden, John",355,1615,1654],
	["Sidney, Philip",380,1566,1586],
	["Swammerdam, Jan",172,1664,1680],
	["Tixall letters",95,1617,1703],
	["Wallis, John",2002,1641,1703]
];

//select catalogue_name, count(original_catalogue) as count, date_of_work_std_year as min from cofk_union_work
//LEFT JOIN cofk_lookup_catalogue ON cofk_union_work.original_catalogue = cofk_lookup_catalogue.catalogue_code
//where cofk_lookup_catalogue.publish_status=1 and cofk_union_work.work_to_be_deleted <> 1
//group by catalogue_name, date_of_work_std_year
//ORDER BY catalogue_name;

// http://csvtojson.com/  - "CatalogueId", "Catalogue", "number", "year"
var catalogueYearsCount = [
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 2,
		"year": 1630
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 1,
		"year": 1632
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 3,
		"year": 1633
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 20,
		"year": 1634
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 68,
		"year": 1635
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 35,
		"year": 1636
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 60,
		"year": 1637
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 38,
		"year": 1638
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 109,
		"year": 1639
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 137,
		"year": 1640
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 148,
		"year": 1641
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 188,
		"year": 1642
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 304,
		"year": 1643
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 347,
		"year": 1644
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 273,
		"year": 1645
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 266,
		"year": 1646
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 240,
		"year": 1647
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 266,
		"year": 1648
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 332,
		"year": 1649
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 230,
		"year": 1650
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 216,
		"year": 1651
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 256,
		"year": 1652
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 128,
		"year": 1653
	},
	{
		"CatalogueId": "ANDREAE",
		"Catalogue": "Andreae, Johann Valentin",
		"number": 29,
		"year": 1654
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 1,
		"year": 1636
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 1,
		"year": 1643
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 1,
		"year": 1644
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 1,
		"year": 1645
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 1,
		"year": 1646
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 6,
		"year": 1649
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 1,
		"year": 1650
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 5,
		"year": 1651
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 5,
		"year": 1652
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 13,
		"year": 1653
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 3,
		"year": 1654
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 4,
		"year": 1655
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 3,
		"year": 1656
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 1,
		"year": 1659
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 4,
		"year": 1660
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 11,
		"year": 1661
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 5,
		"year": 1662
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 7,
		"year": 1663
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 14,
		"year": 1664
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 5,
		"year": 1665
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 1,
		"year": 1666
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 4,
		"year": 1667
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 8,
		"year": 1668
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 9,
		"year": 1669
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 9,
		"year": 1670
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 24,
		"year": 1671
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 43,
		"year": 1672
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 60,
		"year": 1673
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 38,
		"year": 1674
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 43,
		"year": 1675
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 46,
		"year": 1676
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 31,
		"year": 1677
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 41,
		"year": 1678
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 30,
		"year": 1679
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 40,
		"year": 1680
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 39,
		"year": 1681
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 22,
		"year": 1682
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 23,
		"year": 1683
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 24,
		"year": 1684
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 22,
		"year": 1685
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 12,
		"year": 1686
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 15,
		"year": 1687
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 12,
		"year": 1688
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 22,
		"year": 1689
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 11,
		"year": 1690
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 40,
		"year": 1691
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 34,
		"year": 1692
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 59,
		"year": 1693
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 49,
		"year": 1694
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 20,
		"year": 1695
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 9,
		"year": 1696
	},
	{
		"CatalogueId": "AUBREY",
		"Catalogue": "Aubrey, John",
		"number": 141,
		"year": ""
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 2,
		"year": 1615
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 3,
		"year": 1619
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 1,
		"year": 1620
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 8,
		"year": 1624
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 23,
		"year": 1625
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 12,
		"year": 1626
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 26,
		"year": 1627
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 31,
		"year": 1628
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 29,
		"year": 1629
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 31,
		"year": 1630
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 32,
		"year": 1631
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 10,
		"year": 1632
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 24,
		"year": 1633
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 43,
		"year": 1634
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 43,
		"year": 1635
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 36,
		"year": 1636
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 16,
		"year": 1637
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 11,
		"year": 1638
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 29,
		"year": 1639
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 11,
		"year": 1640
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 18,
		"year": 1641
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 26,
		"year": 1642
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 6,
		"year": 1643
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 8,
		"year": 1644
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 14,
		"year": 1645
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 10,
		"year": 1646
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 1,
		"year": 1647
	},
	{
		"CatalogueId": "BARLAEUS",
		"Catalogue": "Barlaeus, Caspar",
		"number": 1,
		"year": ""
	},
	{
		"CatalogueId": "BAXTER",
		"Catalogue": "Baxter, Richard",
		"number": 3,
		"year": 1657
	},
	{
		"CatalogueId": "BAXTER",
		"Catalogue": "Baxter, Richard",
		"number": 4,
		"year": 1658
	},
	{
		"CatalogueId": "BAXTER",
		"Catalogue": "Baxter, Richard",
		"number": 1,
		"year": 1659
	},
	{
		"CatalogueId": "CKCC1",
		"Catalogue": "Beeckman, Isaac",
		"number": 2,
		"year": 1612
	},
	{
		"CatalogueId": "CKCC1",
		"Catalogue": "Beeckman, Isaac",
		"number": 1,
		"year": 1613
	},
	{
		"CatalogueId": "CKCC1",
		"Catalogue": "Beeckman, Isaac",
		"number": 7,
		"year": 1619
	},
	{
		"CatalogueId": "CKCC1",
		"Catalogue": "Beeckman, Isaac",
		"number": 2,
		"year": 1624
	},
	{
		"CatalogueId": "CKCC1",
		"Catalogue": "Beeckman, Isaac",
		"number": 6,
		"year": 1629
	},
	{
		"CatalogueId": "CKCC1",
		"Catalogue": "Beeckman, Isaac",
		"number": 4,
		"year": 1630
	},
	{
		"CatalogueId": "CKCC1",
		"Catalogue": "Beeckman, Isaac",
		"number": 1,
		"year": 1631
	},
	{
		"CatalogueId": "CKCC1",
		"Catalogue": "Beeckman, Isaac",
		"number": 2,
		"year": 1632
	},
	{
		"CatalogueId": "CKCC1",
		"Catalogue": "Beeckman, Isaac",
		"number": 1,
		"year": 1633
	},
	{
		"CatalogueId": "CKCC1",
		"Catalogue": "Beeckman, Isaac",
		"number": 1,
		"year": 1634
	},
	{
		"CatalogueId": "CKCC1",
		"Catalogue": "Beeckman, Isaac",
		"number": 1,
		"year": 1635
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 1,
		"year": 1624
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 2,
		"year": 1625
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 3,
		"year": 1628
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 1,
		"year": 1629
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 1,
		"year": 1630
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 3,
		"year": 1631
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 1,
		"year": 1633
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 1,
		"year": 1634
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 1,
		"year": 1636
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 1,
		"year": 1637
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 7,
		"year": 1638
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 5,
		"year": 1639
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 6,
		"year": 1640
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 6,
		"year": 1641
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 4,
		"year": 1642
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 15,
		"year": 1643
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 13,
		"year": 1644
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 2,
		"year": 1645
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 2,
		"year": 1646
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 2,
		"year": 1647
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 1,
		"year": 1648
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 11,
		"year": 1649
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 18,
		"year": 1650
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 8,
		"year": 1651
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 1,
		"year": 1652
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 1,
		"year": 1653
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 3,
		"year": 1654
	},
	{
		"CatalogueId": "BISTERFELD",
		"Catalogue": "Bisterfeld, Johann Heinrich",
		"number": 1,
		"year": 1656
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 1,
		"year": 1508
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 1,
		"year": 1515
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 1,
		"year": 1516
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 2,
		"year": 1528
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 3,
		"year": 1532
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 1,
		"year": 1536
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 3,
		"year": 1537
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 2,
		"year": 1538
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 2,
		"year": 1546
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 1,
		"year": 1547
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 3,
		"year": 1548
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 1,
		"year": 1550
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 1,
		"year": 1551
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 4,
		"year": 1552
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 3,
		"year": 1553
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 2,
		"year": 1554
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 3,
		"year": 1556
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 1,
		"year": 1559
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 3,
		"year": 1561
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 9,
		"year": 1562
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 5,
		"year": 1563
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 7,
		"year": 1564
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 7,
		"year": 1565
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 13,
		"year": 1566
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 3,
		"year": 1567
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 12,
		"year": 1569
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 4,
		"year": 1570
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 5,
		"year": 1571
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 18,
		"year": 1572
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 27,
		"year": 1573
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 20,
		"year": 1574
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 14,
		"year": 1575
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 7,
		"year": 1576
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 13,
		"year": 1577
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 6,
		"year": 1578
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 14,
		"year": 1579
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 9,
		"year": 1580
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 6,
		"year": 1581
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 10,
		"year": 1582
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 6,
		"year": 1583
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 8,
		"year": 1584
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 18,
		"year": 1585
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 27,
		"year": 1586
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 31,
		"year": 1587
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 12,
		"year": 1588
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 15,
		"year": 1589
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 13,
		"year": 1590
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 13,
		"year": 1591
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 17,
		"year": 1592
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 9,
		"year": 1593
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 17,
		"year": 1594
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 33,
		"year": 1595
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 16,
		"year": 1596
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 16,
		"year": 1597
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 22,
		"year": 1598
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 13,
		"year": 1599
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 19,
		"year": 1600
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 25,
		"year": 1601
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 16,
		"year": 1602
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 14,
		"year": 1603
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 16,
		"year": 1604
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 7,
		"year": 1605
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 10,
		"year": 1606
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 18,
		"year": 1607
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 24,
		"year": 1608
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 30,
		"year": 1609
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 34,
		"year": 1610
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 44,
		"year": 1611
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 51,
		"year": 1612
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 37,
		"year": 1613
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 46,
		"year": 1614
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 37,
		"year": 1615
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 40,
		"year": 1616
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 42,
		"year": 1617
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 54,
		"year": 1618
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 92,
		"year": 1619
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 63,
		"year": 1620
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 53,
		"year": 1621
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 49,
		"year": 1622
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 54,
		"year": 1623
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 78,
		"year": 1624
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 70,
		"year": 1625
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 78,
		"year": 1626
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 91,
		"year": 1627
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 132,
		"year": 1628
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 98,
		"year": 1629
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 150,
		"year": 1630
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 133,
		"year": 1631
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 152,
		"year": 1632
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 139,
		"year": 1633
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 114,
		"year": 1634
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 125,
		"year": 1635
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 152,
		"year": 1636
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 118,
		"year": 1637
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 179,
		"year": 1638
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 146,
		"year": 1639
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 148,
		"year": 1640
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 226,
		"year": 1641
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 228,
		"year": 1642
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 246,
		"year": 1643
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 192,
		"year": 1644
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 183,
		"year": 1645
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 315,
		"year": 1646
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 195,
		"year": 1647
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 251,
		"year": 1648
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 91,
		"year": 1649
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 76,
		"year": 1650
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 148,
		"year": 1651
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 114,
		"year": 1652
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 96,
		"year": 1653
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 56,
		"year": 1654
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 53,
		"year": 1655
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 50,
		"year": 1656
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 58,
		"year": 1657
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 41,
		"year": 1658
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 96,
		"year": 1659
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 49,
		"year": 1660
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 87,
		"year": 1661
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 99,
		"year": 1662
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 108,
		"year": 1663
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 177,
		"year": 1664
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 179,
		"year": 1665
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 181,
		"year": 1666
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 181,
		"year": 1667
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 187,
		"year": 1668
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 176,
		"year": 1669
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 179,
		"year": 1670
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 241,
		"year": 1671
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 268,
		"year": 1672
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 293,
		"year": 1673
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 245,
		"year": 1674
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 231,
		"year": 1675
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 216,
		"year": 1676
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 194,
		"year": 1677
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 271,
		"year": 1678
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 273,
		"year": 1679
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 274,
		"year": 1680
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 271,
		"year": 1681
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 254,
		"year": 1682
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 269,
		"year": 1683
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 316,
		"year": 1684
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 356,
		"year": 1685
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 278,
		"year": 1686
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 280,
		"year": 1687
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 424,
		"year": 1688
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 400,
		"year": 1689
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 379,
		"year": 1690
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 456,
		"year": 1691
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 483,
		"year": 1692
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 421,
		"year": 1693
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 569,
		"year": 1694
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 562,
		"year": 1695
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 426,
		"year": 1696
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 449,
		"year": 1697
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 502,
		"year": 1698
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 411,
		"year": 1699
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 347,
		"year": 1700
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 351,
		"year": 1701
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 332,
		"year": 1702
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 371,
		"year": 1703
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 381,
		"year": 1704
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 331,
		"year": 1705
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 280,
		"year": 1706
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 451,
		"year": 1707
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 476,
		"year": 1708
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 434,
		"year": 1709
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 293,
		"year": 1710
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 403,
		"year": 1711
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 393,
		"year": 1712
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 340,
		"year": 1713
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 343,
		"year": 1714
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 430,
		"year": 1715
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 486,
		"year": 1716
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 451,
		"year": 1717
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 463,
		"year": 1718
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 468,
		"year": 1719
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 495,
		"year": 1720
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 346,
		"year": 1721
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 289,
		"year": 1722
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 277,
		"year": 1723
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 254,
		"year": 1724
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 293,
		"year": 1725
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 312,
		"year": 1726
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 414,
		"year": 1727
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 350,
		"year": 1728
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 477,
		"year": 1729
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 399,
		"year": 1730
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 424,
		"year": 1731
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 433,
		"year": 1732
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 456,
		"year": 1733
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 441,
		"year": 1734
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 402,
		"year": 1735
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 366,
		"year": 1736
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 441,
		"year": 1737
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 352,
		"year": 1738
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 343,
		"year": 1739
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 326,
		"year": 1740
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 252,
		"year": 1741
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 230,
		"year": 1742
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 235,
		"year": 1743
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 178,
		"year": 1744
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 163,
		"year": 1745
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 122,
		"year": 1746
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 78,
		"year": 1747
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 85,
		"year": 1748
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 152,
		"year": 1749
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 153,
		"year": 1750
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 127,
		"year": 1751
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 110,
		"year": 1752
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 106,
		"year": 1753
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 104,
		"year": 1754
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 39,
		"year": 1755
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 38,
		"year": 1756
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 36,
		"year": 1757
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 68,
		"year": 1758
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 54,
		"year": 1759
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 114,
		"year": 1760
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 81,
		"year": 1761
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 55,
		"year": 1762
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 107,
		"year": 1763
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 63,
		"year": 1764
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 59,
		"year": 1765
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 65,
		"year": 1766
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 73,
		"year": 1767
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 114,
		"year": 1768
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 124,
		"year": 1769
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 103,
		"year": 1770
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 102,
		"year": 1771
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 112,
		"year": 1772
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 89,
		"year": 1773
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 124,
		"year": 1774
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 132,
		"year": 1775
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 98,
		"year": 1776
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 84,
		"year": 1777
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 55,
		"year": 1778
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 81,
		"year": 1779
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 104,
		"year": 1780
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 103,
		"year": 1781
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 97,
		"year": 1782
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 87,
		"year": 1783
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 116,
		"year": 1784
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 310,
		"year": 1785
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 243,
		"year": 1786
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 173,
		"year": 1787
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 109,
		"year": 1788
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 72,
		"year": 1789
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 102,
		"year": 1790
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 91,
		"year": 1791
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 104,
		"year": 1792
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 81,
		"year": 1793
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 83,
		"year": 1794
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 78,
		"year": 1795
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 95,
		"year": 1796
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 108,
		"year": 1797
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 90,
		"year": 1798
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 108,
		"year": 1799
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 78,
		"year": 1800
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 77,
		"year": 1801
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 100,
		"year": 1802
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 56,
		"year": 1803
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 75,
		"year": 1804
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 63,
		"year": 1805
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 73,
		"year": 1806
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 73,
		"year": 1807
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 90,
		"year": 1808
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 93,
		"year": 1809
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 103,
		"year": 1810
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 95,
		"year": 1811
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 52,
		"year": 1812
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 48,
		"year": 1813
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 62,
		"year": 1814
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 55,
		"year": 1815
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 36,
		"year": 1816
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 38,
		"year": 1817
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 55,
		"year": 1818
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 43,
		"year": 1819
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 51,
		"year": 1820
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 40,
		"year": 1821
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 57,
		"year": 1822
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 33,
		"year": 1823
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 31,
		"year": 1824
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 20,
		"year": 1825
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 15,
		"year": 1826
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 1,
		"year": 1827
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 2,
		"year": 1828
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 1,
		"year": 1829
	},
	{
		"CatalogueId": "cardindex",
		"Catalogue": "Bodleian card catalogue",
		"number": 12765,
		"year": ""
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 18,
		"year": 1630
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 1,
		"year": 1637
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 6,
		"year": 1638
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 11,
		"year": 1639
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 18,
		"year": 1640
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 2,
		"year": 1662
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 4,
		"year": 1663
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 14,
		"year": 1664
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 33,
		"year": 1665
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 35,
		"year": 1666
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 16,
		"year": 1667
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 51,
		"year": 1668
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 64,
		"year": 1669
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 39,
		"year": 1670
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 74,
		"year": 1671
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 71,
		"year": 1672
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 50,
		"year": 1673
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 66,
		"year": 1674
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 98,
		"year": 1675
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 73,
		"year": 1676
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 92,
		"year": 1677
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 37,
		"year": 1678
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 33,
		"year": 1679
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 25,
		"year": 1680
	},
	{
		"CatalogueId": "BOURIGNON",
		"Catalogue": "Bourignon, Antoinette",
		"number": 9,
		"year": ""
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 1,
		"year": 1568
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 2,
		"year": 1571
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 6,
		"year": 1572
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 7,
		"year": 1573
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 1,
		"year": 1574
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 6,
		"year": 1575
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 12,
		"year": 1576
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 4,
		"year": 1577
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 2,
		"year": 1578
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 7,
		"year": 1579
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 3,
		"year": 1580
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 2,
		"year": 1581
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 2,
		"year": 1582
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 1,
		"year": 1583
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 7,
		"year": 1584
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 10,
		"year": 1585
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 11,
		"year": 1586
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 14,
		"year": 1587
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 16,
		"year": 1588
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 21,
		"year": 1589
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 27,
		"year": 1590
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 13,
		"year": 1591
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 23,
		"year": 1592
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 8,
		"year": 1593
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 8,
		"year": 1594
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 3,
		"year": 1595
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 8,
		"year": 1596
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 23,
		"year": 1597
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 59,
		"year": 1598
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 40,
		"year": 1599
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 133,
		"year": 1600
	},
	{
		"CatalogueId": "TYCHO",
		"Catalogue": "Brahe, Tycho",
		"number": 25,
		"year": 1601
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 1,
		"year": 1622
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 1,
		"year": 1623
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 1,
		"year": 1628
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 7,
		"year": 1629
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 12,
		"year": 1630
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 4,
		"year": 1631
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 8,
		"year": 1632
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 19,
		"year": 1633
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 5,
		"year": 1634
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 3,
		"year": 1635
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 1,
		"year": 1636
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 2,
		"year": 1637
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 10,
		"year": 1638
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 11,
		"year": 1639
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 16,
		"year": 1640
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 14,
		"year": 1641
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 25,
		"year": 1642
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 18,
		"year": 1643
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 17,
		"year": 1644
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 40,
		"year": 1645
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 18,
		"year": 1646
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 23,
		"year": 1647
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 8,
		"year": 1648
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 11,
		"year": 1649
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 14,
		"year": 1650
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 4,
		"year": 1651
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 4,
		"year": 1652
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 1,
		"year": 1653
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 5,
		"year": 1654
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 14,
		"year": 1655
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 18,
		"year": 1656
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 45,
		"year": 1657
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 34,
		"year": 1658
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 10,
		"year": 1659
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 10,
		"year": 1660
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 21,
		"year": 1661
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 12,
		"year": 1662
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 16,
		"year": 1663
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 14,
		"year": 1664
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 5,
		"year": 1665
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 12,
		"year": 1666
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 8,
		"year": 1667
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 15,
		"year": 1668
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 11,
		"year": 1669
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 5,
		"year": 1670
	},
	{
		"CatalogueId": "COMENIUS",
		"Catalogue": "Comenius, Jan Amos",
		"number": 13,
		"year": ""
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 1,
		"year": 1573
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 1,
		"year": 1574
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 6,
		"year": 1575
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 1,
		"year": 1577
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 1,
		"year": 1578
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 3,
		"year": 1579
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 4,
		"year": 1580
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 2,
		"year": 1581
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 1,
		"year": 1582
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 1,
		"year": 1583
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 5,
		"year": 1584
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 5,
		"year": 1585
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 1,
		"year": 1586
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 6,
		"year": 1587
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 9,
		"year": 1588
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 12,
		"year": 1589
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 7,
		"year": 1590
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 4,
		"year": 1591
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 6,
		"year": 1592
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 6,
		"year": 1593
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 4,
		"year": 1594
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 12,
		"year": 1595
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 33,
		"year": 1596
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 14,
		"year": 1597
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 13,
		"year": 1598
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 12,
		"year": 1599
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 33,
		"year": 1600
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 23,
		"year": 1601
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 7,
		"year": 1602
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 9,
		"year": 1603
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 6,
		"year": 1605
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 5,
		"year": 1606
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 1,
		"year": 1607
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 1,
		"year": 1608
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 1,
		"year": 1610
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 3,
		"year": 1611
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 1,
		"year": 1612
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 4,
		"year": 1613
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 1,
		"year": 1614
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 1,
		"year": 1616
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 2,
		"year": 1618
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 2,
		"year": 1619
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 3,
		"year": 1622
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 1,
		"year": 1623
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 3,
		"year": 1624
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 2,
		"year": 1626
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 1,
		"year": 1627
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 1,
		"year": 1630
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 8,
		"year": 1633
	},
	{
		"CatalogueId": "HRUBY",
		"Catalogue": "Czech students in Protestant universities (Hrubý)",
		"number": 1,
		"year": 1634
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 6,
		"year": 1619
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 2,
		"year": 1622
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 1,
		"year": 1623
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 1,
		"year": 1625
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 1,
		"year": 1626
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 2,
		"year": 1628
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 10,
		"year": 1629
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 15,
		"year": 1630
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 8,
		"year": 1631
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 9,
		"year": 1632
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 5,
		"year": 1633
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 7,
		"year": 1634
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 10,
		"year": 1635
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 10,
		"year": 1636
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 44,
		"year": 1637
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 61,
		"year": 1638
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 39,
		"year": 1639
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 56,
		"year": 1640
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 39,
		"year": 1641
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 40,
		"year": 1642
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 60,
		"year": 1643
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 35,
		"year": 1644
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 61,
		"year": 1645
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 58,
		"year": 1646
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 44,
		"year": 1647
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 37,
		"year": 1648
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 48,
		"year": 1649
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 3,
		"year": 1650
	},
	{
		"CatalogueId": "DESCARTES",
		"Catalogue": "Descartes, René",
		"number": 15,
		"year": ""
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 1,
		"year": 1630
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 15,
		"year": 1636
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 6,
		"year": 1637
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 11,
		"year": 1638
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 1,
		"year": 1639
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 9,
		"year": 1640
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 5,
		"year": 1641
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 1,
		"year": 1642
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 9,
		"year": 1643
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 1,
		"year": 1644
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 1,
		"year": 1645
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 1,
		"year": 1646
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 4,
		"year": 1648
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 1,
		"year": 1651
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 11,
		"year": 1654
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 4,
		"year": 1656
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 11,
		"year": 1657
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 11,
		"year": 1658
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 5,
		"year": 1659
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 5,
		"year": 1660
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 3,
		"year": 1661
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 3,
		"year": 1662
	},
	{
		"CatalogueId": "FERMAT",
		"Catalogue": "Fermat, Pierre de",
		"number": 2,
		"year": 1664
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 1,
		"year": 1617
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 2,
		"year": 1634
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 5,
		"year": 1635
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 1,
		"year": 1636
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 4,
		"year": 1637
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 4,
		"year": 1638
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 2,
		"year": 1639
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 6,
		"year": 1640
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 3,
		"year": 1641
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 3,
		"year": 1642
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 8,
		"year": 1643
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 2,
		"year": 1644
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 1,
		"year": 1645
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 2,
		"year": 1646
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 3,
		"year": 1647
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 5,
		"year": 1648
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 8,
		"year": 1649
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 8,
		"year": 1650
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 12,
		"year": 1651
	},
	{
		"CatalogueId": "FRANCKENBERG",
		"Catalogue": "Franckenberg, Abraham von",
		"number": 5,
		"year": 1652
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1566
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1580
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1583
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1584
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1585
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1589
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1594
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 3,
		"year": 1599
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1603
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1607
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1619
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1621
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1622
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1624
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1625
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1635
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1643
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1663
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1666
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1671
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1673
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1674
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1680
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 3,
		"year": 1682
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1686
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1687
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1688
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1691
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1692
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1693
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1706
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1708
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1712
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1713
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1715
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1716
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1717
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1719
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1721
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1722
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1725
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1726
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1729
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1730
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1731
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 3,
		"year": 1732
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1733
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1734
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1736
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1738
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 3,
		"year": 1739
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 3,
		"year": 1740
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 3,
		"year": 1741
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1742
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1743
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1744
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1746
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 4,
		"year": 1747
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1749
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 4,
		"year": 1750
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1751
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1752
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1753
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 3,
		"year": 1754
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1755
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 6,
		"year": 1756
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 4,
		"year": 1758
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1759
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1760
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 6,
		"year": 1761
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1762
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1763
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1765
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 3,
		"year": 1766
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1767
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1769
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1770
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1771
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1772
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1773
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1774
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 3,
		"year": 1776
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 3,
		"year": 1777
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1778
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 6,
		"year": 1779
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1780
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1782
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 3,
		"year": 1785
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1786
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 4,
		"year": 1788
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 5,
		"year": 1789
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 6,
		"year": 1790
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1791
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1792
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 6,
		"year": 1793
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 6,
		"year": 1794
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1795
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 5,
		"year": 1796
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 3,
		"year": 1797
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1798
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1799
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1800
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1801
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1802
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1803
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 6,
		"year": 1804
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1805
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1807
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 4,
		"year": 1809
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 6,
		"year": 1811
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1812
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1813
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1814
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1815
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 3,
		"year": 1816
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 4,
		"year": 1818
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1819
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 3,
		"year": 1820
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1822
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 4,
		"year": 1823
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1828
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 2,
		"year": 1829
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 4,
		"year": 1830
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1831
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1833
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 1,
		"year": 1837
	},
	{
		"CatalogueId": "GAMBA",
		"Catalogue": "Gamba collection",
		"number": 8,
		"year": ""
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 1,
		"year": 1716
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 1,
		"year": 1717
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 1,
		"year": 1719
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 1,
		"year": 1720
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 1,
		"year": 1725
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 1,
		"year": 1727
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 1,
		"year": 1733
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 15,
		"year": 1735
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 7,
		"year": 1736
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 46,
		"year": 1738
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 161,
		"year": 1739
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 109,
		"year": 1740
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 94,
		"year": 1741
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 71,
		"year": 1742
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 131,
		"year": 1743
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 154,
		"year": 1744
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 150,
		"year": 1745
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 157,
		"year": 1746
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 120,
		"year": 1747
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 125,
		"year": 1748
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 152,
		"year": 1749
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 156,
		"year": 1750
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 158,
		"year": 1751
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 157,
		"year": 1752
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 129,
		"year": 1753
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 113,
		"year": 1754
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 98,
		"year": 1755
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 68,
		"year": 1756
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 48,
		"year": 1757
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 87,
		"year": 1758
	},
	{
		"CatalogueId": "GRAFFIGNY",
		"Catalogue": "Graffigny, Françoise de",
		"number": 11,
		"year": 1759
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 7,
		"year": 1734
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 14,
		"year": 1735
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 19,
		"year": 1736
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 12,
		"year": 1737
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 16,
		"year": 1738
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 23,
		"year": 1739
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 21,
		"year": 1740
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 7,
		"year": 1741
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 15,
		"year": 1742
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 2,
		"year": 1743
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 1,
		"year": 1744
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 2,
		"year": 1745
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 13,
		"year": 1746
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 15,
		"year": 1747
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 5,
		"year": 1748
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 5,
		"year": 1749
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 5,
		"year": 1750
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 11,
		"year": 1751
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 10,
		"year": 1752
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 16,
		"year": 1753
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 12,
		"year": 1754
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 18,
		"year": 1755
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 19,
		"year": 1756
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 37,
		"year": 1757
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 31,
		"year": 1758
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 25,
		"year": 1759
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 24,
		"year": 1760
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 25,
		"year": 1761
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 13,
		"year": 1762
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 20,
		"year": 1763
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 18,
		"year": 1764
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 23,
		"year": 1765
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 14,
		"year": 1766
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 29,
		"year": 1767
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 31,
		"year": 1768
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 25,
		"year": 1769
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 43,
		"year": 1770
	},
	{
		"CatalogueId": "GRAY",
		"Catalogue": "Gray, Thomas",
		"number": 25,
		"year": 1771
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 2,
		"year": 1594
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 5,
		"year": 1597
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 3,
		"year": 1598
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 9,
		"year": 1599
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 7,
		"year": 1600
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 10,
		"year": 1601
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 12,
		"year": 1602
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 12,
		"year": 1603
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 14,
		"year": 1604
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 14,
		"year": 1605
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 22,
		"year": 1606
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 18,
		"year": 1607
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 52,
		"year": 1608
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 49,
		"year": 1609
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 29,
		"year": 1610
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 31,
		"year": 1611
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 41,
		"year": 1612
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 70,
		"year": 1613
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 83,
		"year": 1614
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 60,
		"year": 1615
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 59,
		"year": 1616
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 65,
		"year": 1617
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 42,
		"year": 1618
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 16,
		"year": 1619
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 18,
		"year": 1620
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 118,
		"year": 1621
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 109,
		"year": 1622
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 60,
		"year": 1623
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 77,
		"year": 1624
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 119,
		"year": 1625
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 73,
		"year": 1626
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 97,
		"year": 1627
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 159,
		"year": 1628
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 120,
		"year": 1629
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 114,
		"year": 1630
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 159,
		"year": 1631
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 97,
		"year": 1632
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 103,
		"year": 1633
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 68,
		"year": 1634
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 487,
		"year": 1635
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 517,
		"year": 1636
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 530,
		"year": 1637
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 544,
		"year": 1638
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 564,
		"year": 1639
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 580,
		"year": 1640
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 583,
		"year": 1641
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 502,
		"year": 1642
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 634,
		"year": 1643
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 622,
		"year": 1644
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 241,
		"year": 1645
	},
	{
		"CatalogueId": "GROTIUS",
		"Catalogue": "Groot, Hugo de",
		"number": 14,
		"year": ""
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 1,
		"year": 1620
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 1,
		"year": 1621
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 1,
		"year": 1622
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 2,
		"year": 1623
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 2,
		"year": 1624
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 3,
		"year": 1625
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 2,
		"year": 1626
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 15,
		"year": 1628
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 8,
		"year": 1629
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 13,
		"year": 1630
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 23,
		"year": 1631
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 36,
		"year": 1632
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 82,
		"year": 1633
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 93,
		"year": 1634
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 98,
		"year": 1635
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 109,
		"year": 1636
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 109,
		"year": 1637
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 125,
		"year": 1638
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 131,
		"year": 1639
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 188,
		"year": 1640
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 96,
		"year": 1641
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 130,
		"year": 1642
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 84,
		"year": 1643
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 123,
		"year": 1644
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 134,
		"year": 1645
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 107,
		"year": 1646
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 146,
		"year": 1647
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 182,
		"year": 1648
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 106,
		"year": 1649
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 86,
		"year": 1650
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 107,
		"year": 1651
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 84,
		"year": 1652
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 107,
		"year": 1653
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 196,
		"year": 1654
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 244,
		"year": 1655
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 178,
		"year": 1656
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 210,
		"year": 1657
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 294,
		"year": 1658
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 268,
		"year": 1659
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 130,
		"year": 1660
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 177,
		"year": 1661
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 13,
		"year": 1662
	},
	{
		"CatalogueId": "HARTLIB",
		"Catalogue": "Hartlib, Samuel",
		"number": 474,
		"year": ""
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 1,
		"year": 1636
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 3,
		"year": 1637
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 1,
		"year": 1638
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 10,
		"year": 1639
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 9,
		"year": 1640
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 1,
		"year": 1641
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 4,
		"year": 1642
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 4,
		"year": 1643
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 9,
		"year": 1644
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 7,
		"year": 1645
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 24,
		"year": 1646
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 19,
		"year": 1647
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 25,
		"year": 1648
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 14,
		"year": 1649
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 23,
		"year": 1650
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 20,
		"year": 1651
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 41,
		"year": 1652
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 24,
		"year": 1653
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 41,
		"year": 1654
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 43,
		"year": 1655
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 118,
		"year": 1656
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 86,
		"year": 1657
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 116,
		"year": 1658
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 152,
		"year": 1659
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 134,
		"year": 1660
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 131,
		"year": 1661
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 135,
		"year": 1662
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 113,
		"year": 1663
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 108,
		"year": 1664
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 212,
		"year": 1665
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 62,
		"year": 1666
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 49,
		"year": 1667
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 78,
		"year": 1668
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 98,
		"year": 1669
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 33,
		"year": 1670
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 37,
		"year": 1671
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 61,
		"year": 1672
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 67,
		"year": 1673
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 22,
		"year": 1674
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 79,
		"year": 1675
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 19,
		"year": 1676
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 15,
		"year": 1677
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 42,
		"year": 1678
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 51,
		"year": 1679
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 30,
		"year": 1680
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 17,
		"year": 1681
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 33,
		"year": 1682
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 42,
		"year": 1683
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 53,
		"year": 1684
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 39,
		"year": 1685
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 38,
		"year": 1686
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 60,
		"year": 1687
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 18,
		"year": 1688
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 26,
		"year": 1689
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 104,
		"year": 1690
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 71,
		"year": 1691
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 63,
		"year": 1692
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 58,
		"year": 1693
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 46,
		"year": 1694
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 7,
		"year": 1695
	},
	{
		"CatalogueId": "HUYGENSCHR",
		"Catalogue": "Huygens, Christiaan",
		"number": 34,
		"year": ""
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 1,
		"year": 1608
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 6,
		"year": 1609
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 5,
		"year": 1610
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 2,
		"year": 1613
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 2,
		"year": 1615
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 4,
		"year": 1616
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 20,
		"year": 1617
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 19,
		"year": 1618
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 17,
		"year": 1619
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 22,
		"year": 1620
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 23,
		"year": 1621
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 80,
		"year": 1622
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 14,
		"year": 1623
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 39,
		"year": 1624
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 49,
		"year": 1625
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 33,
		"year": 1626
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 50,
		"year": 1627
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 34,
		"year": 1628
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 64,
		"year": 1629
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 91,
		"year": 1630
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 79,
		"year": 1631
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 100,
		"year": 1632
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 111,
		"year": 1633
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 198,
		"year": 1634
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 277,
		"year": 1635
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 181,
		"year": 1636
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 262,
		"year": 1637
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 235,
		"year": 1638
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 267,
		"year": 1639
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 303,
		"year": 1640
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 323,
		"year": 1641
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 272,
		"year": 1642
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 228,
		"year": 1643
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 415,
		"year": 1644
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 371,
		"year": 1645
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 266,
		"year": 1646
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 204,
		"year": 1647
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 167,
		"year": 1648
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 105,
		"year": 1649
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 67,
		"year": 1650
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 119,
		"year": 1651
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 57,
		"year": 1652
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 59,
		"year": 1653
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 57,
		"year": 1654
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 53,
		"year": 1655
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 75,
		"year": 1656
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 42,
		"year": 1657
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 35,
		"year": 1658
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 29,
		"year": 1659
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 44,
		"year": 1660
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 67,
		"year": 1661
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 260,
		"year": 1662
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 201,
		"year": 1663
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 175,
		"year": 1664
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 117,
		"year": 1665
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 85,
		"year": 1666
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 41,
		"year": 1667
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 50,
		"year": 1668
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 48,
		"year": 1669
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 36,
		"year": 1670
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 41,
		"year": 1671
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 56,
		"year": 1672
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 51,
		"year": 1673
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 34,
		"year": 1674
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 37,
		"year": 1675
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 33,
		"year": 1676
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 27,
		"year": 1677
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 30,
		"year": 1678
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 39,
		"year": 1679
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 22,
		"year": 1680
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 14,
		"year": 1681
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 21,
		"year": 1682
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 9,
		"year": 1683
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 12,
		"year": 1684
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 4,
		"year": 1685
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 14,
		"year": 1686
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 4,
		"year": 1687
	},
	{
		"CatalogueId": "HUYGENSCONST",
		"Catalogue": "Huygens, Constantijn",
		"number": 16,
		"year": ""
	},
	{
		"CatalogueId": "KEPLER",
		"Catalogue": "Kepler, Johannes",
		"number": 2,
		"year": 1590
	},
	{
		"CatalogueId": "KEPLER",
		"Catalogue": "Kepler, Johannes",
		"number": 2,
		"year": 1591
	},
	{
		"CatalogueId": "KEPLER",
		"Catalogue": "Kepler, Johannes",
		"number": 3,
		"year": 1593
	},
	{
		"CatalogueId": "KEPLER",
		"Catalogue": "Kepler, Johannes",
		"number": 8,
		"year": 1594
	},
	{
		"CatalogueId": "KEPLER",
		"Catalogue": "Kepler, Johannes",
		"number": 12,
		"year": 1595
	},
	{
		"CatalogueId": "KEPLER",
		"Catalogue": "Kepler, Johannes",
		"number": 28,
		"year": 1596
	},
	{
		"CatalogueId": "KEPLER",
		"Catalogue": "Kepler, Johannes",
		"number": 29,
		"year": 1597
	},
	{
		"CatalogueId": "KEPLER",
		"Catalogue": "Kepler, Johannes",
		"number": 24,
		"year": 1598
	},
	{
		"CatalogueId": "KEPLER",
		"Catalogue": "Kepler, Johannes",
		"number": 44,
		"year": 1599
	},
	{
		"CatalogueId": "KEPLER",
		"Catalogue": "Kepler, Johannes",
		"number": 28,
		"year": 1600
	},
	{
		"CatalogueId": "KEPLER",
		"Catalogue": "Kepler, Johannes",
		"number": 24,
		"year": 1601
	},
	{
		"CatalogueId": "KEPLER",
		"Catalogue": "Kepler, Johannes",
		"number": 37,
		"year": 1602
	},
	{
		"CatalogueId": "KEPLER",
		"Catalogue": "Kepler, Johannes",
		"number": 33,
		"year": 1603
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 1,
		"year": 1629
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 4,
		"year": 1632
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 14,
		"year": 1633
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 13,
		"year": 1634
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 12,
		"year": 1635
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 9,
		"year": 1636
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 17,
		"year": 1637
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 17,
		"year": 1638
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 20,
		"year": 1639
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 46,
		"year": 1640
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 19,
		"year": 1641
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 42,
		"year": 1642
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 24,
		"year": 1643
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 27,
		"year": 1644
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 31,
		"year": 1645
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 43,
		"year": 1646
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 68,
		"year": 1647
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 64,
		"year": 1648
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 39,
		"year": 1649
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 88,
		"year": 1650
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 84,
		"year": 1651
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 73,
		"year": 1652
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 87,
		"year": 1653
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 64,
		"year": 1654
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 88,
		"year": 1655
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 54,
		"year": 1656
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 31,
		"year": 1657
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 41,
		"year": 1658
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 59,
		"year": 1659
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 61,
		"year": 1660
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 60,
		"year": 1661
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 44,
		"year": 1662
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 52,
		"year": 1663
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 85,
		"year": 1664
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 125,
		"year": 1665
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 129,
		"year": 1666
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 60,
		"year": 1667
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 80,
		"year": 1668
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 61,
		"year": 1669
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 57,
		"year": 1670
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 75,
		"year": 1671
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 78,
		"year": 1672
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 50,
		"year": 1673
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 40,
		"year": 1674
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 59,
		"year": 1675
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 64,
		"year": 1676
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 51,
		"year": 1677
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 28,
		"year": 1678
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 16,
		"year": 1679
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 3,
		"year": 1680
	},
	{
		"CatalogueId": "KIRCHER",
		"Catalogue": "Kircher, Athanasius",
		"number": 239,
		"year": ""
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1592
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 2,
		"year": 1600
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1602
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1606
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1608
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1609
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1613
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1629
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1630
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1635
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 4,
		"year": 1640
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 2,
		"year": 1642
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 2,
		"year": 1643
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1646
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 2,
		"year": 1647
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 3,
		"year": 1649
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1650
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1651
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1653
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1655
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1657
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1658
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1660
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 3,
		"year": 1661
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1662
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 3,
		"year": 1663
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 3,
		"year": 1664
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 2,
		"year": 1666
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 3,
		"year": 1667
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1669
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 1,
		"year": 1677
	},
	{
		"CatalogueId": "KIRCHER2",
		"Catalogue": "Kircher-related correspondence",
		"number": 6,
		"year": ""
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 3,
		"year": 1673
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 11,
		"year": 1674
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 5,
		"year": 1675
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 10,
		"year": 1676
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 7,
		"year": 1677
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 5,
		"year": 1678
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 12,
		"year": 1679
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 12,
		"year": 1680
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 1,
		"year": 1681
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 3,
		"year": 1682
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 10,
		"year": 1683
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 2,
		"year": 1684
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 7,
		"year": 1685
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 8,
		"year": 1686
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 9,
		"year": 1687
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 6,
		"year": 1688
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 3,
		"year": 1689
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 2,
		"year": 1691
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 10,
		"year": 1692
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 8,
		"year": 1693
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 14,
		"year": 1694
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 22,
		"year": 1695
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 20,
		"year": 1696
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 9,
		"year": 1697
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 7,
		"year": 1698
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 10,
		"year": 1699
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 15,
		"year": 1700
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 14,
		"year": 1701
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 7,
		"year": 1702
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 5,
		"year": 1703
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 9,
		"year": 1704
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 8,
		"year": 1705
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 4,
		"year": 1706
	},
	{
		"CatalogueId": "LEEUWENHOEK",
		"Catalogue": "Leeuwenhoek, Antoni van",
		"number": 4,
		"year": 1707
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 1,
		"year": 1674
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 1,
		"year": 1680
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 1,
		"year": 1683
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 1,
		"year": 1684
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 5,
		"year": 1685
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 10,
		"year": 1686
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 3,
		"year": 1687
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 6,
		"year": 1688
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 19,
		"year": 1689
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 35,
		"year": 1690
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 51,
		"year": 1691
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 75,
		"year": 1692
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 118,
		"year": 1693
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 136,
		"year": 1694
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 150,
		"year": 1695
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 130,
		"year": 1696
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 162,
		"year": 1697
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 150,
		"year": 1698
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 65,
		"year": 1699
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 95,
		"year": 1700
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 146,
		"year": 1701
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 133,
		"year": 1702
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 202,
		"year": 1703
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 134,
		"year": 1704
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 57,
		"year": 1705
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 43,
		"year": 1706
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 65,
		"year": 1707
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 81,
		"year": 1708
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 39,
		"year": 1709
	},
	{
		"CatalogueId": "LHWYD",
		"Catalogue": "Lhwyd, Edward",
		"number": 14,
		"year": ""
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 1,
		"year": 1660
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 1,
		"year": 1662
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 30,
		"year": 1663
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 34,
		"year": 1664
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 3,
		"year": 1665
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 6,
		"year": 1666
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 22,
		"year": 1667
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 25,
		"year": 1668
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 7,
		"year": 1669
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 16,
		"year": 1670
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 50,
		"year": 1671
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 42,
		"year": 1672
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 57,
		"year": 1673
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 52,
		"year": 1674
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 42,
		"year": 1675
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 17,
		"year": 1676
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 10,
		"year": 1677
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 3,
		"year": 1678
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 1,
		"year": 1679
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 2,
		"year": 1680
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 5,
		"year": 1681
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 27,
		"year": 1682
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 41,
		"year": 1683
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 15,
		"year": 1684
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 9,
		"year": 1685
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 8,
		"year": 1686
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 4,
		"year": 1687
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 7,
		"year": 1688
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 10,
		"year": 1689
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 20,
		"year": 1690
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 17,
		"year": 1691
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 18,
		"year": 1692
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 51,
		"year": 1693
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 46,
		"year": 1694
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 50,
		"year": 1695
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 36,
		"year": 1696
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 30,
		"year": 1697
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 64,
		"year": 1698
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 41,
		"year": 1699
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 24,
		"year": 1700
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 12,
		"year": 1701
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 31,
		"year": 1702
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 7,
		"year": 1703
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 16,
		"year": 1704
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 10,
		"year": 1705
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 4,
		"year": 1706
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 19,
		"year": 1707
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 41,
		"year": 1708
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 56,
		"year": 1709
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 20,
		"year": 1710
	},
	{
		"CatalogueId": "LISTER",
		"Catalogue": "Lister, Martin",
		"number": 52,
		"year": ""
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 1,
		"year": 1585
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 2,
		"year": 1586
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 8,
		"year": 1590
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 2,
		"year": 1591
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 2,
		"year": 1592
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 2,
		"year": 1593
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 1,
		"year": 1595
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 2,
		"year": 1597
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 2,
		"year": 1598
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 2,
		"year": 1599
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 2,
		"year": 1600
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 6,
		"year": 1601
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 5,
		"year": 1602
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 2,
		"year": 1603
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 9,
		"year": 1604
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 14,
		"year": 1605
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 3,
		"year": 1606
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 2,
		"year": 1608
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 2,
		"year": 1609
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 13,
		"year": 1610
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 6,
		"year": 1611
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 2,
		"year": 1612
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 7,
		"year": 1613
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 1,
		"year": 1614
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 1,
		"year": 1615
	},
	{
		"CatalogueId": "MAGINI",
		"Catalogue": "Magini, Giovanni Antonio",
		"number": 1,
		"year": ""
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 6,
		"year": 1617
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 2,
		"year": 1619
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 2,
		"year": 1621
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 5,
		"year": 1622
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 4,
		"year": 1623
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 7,
		"year": 1624
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 15,
		"year": 1625
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 26,
		"year": 1626
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 17,
		"year": 1627
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 36,
		"year": 1628
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 23,
		"year": 1629
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 37,
		"year": 1630
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 25,
		"year": 1631
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 21,
		"year": 1632
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 66,
		"year": 1633
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 100,
		"year": 1634
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 138,
		"year": 1635
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 43,
		"year": 1636
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 61,
		"year": 1637
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 76,
		"year": 1638
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 91,
		"year": 1639
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 163,
		"year": 1640
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 103,
		"year": 1641
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 98,
		"year": 1642
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 89,
		"year": 1643
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 98,
		"year": 1644
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 90,
		"year": 1645
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 165,
		"year": 1646
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 147,
		"year": 1647
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 138,
		"year": 1648
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 4,
		"year": 1649
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 3,
		"year": 1650
	},
	{
		"CatalogueId": "MERSENNE",
		"Catalogue": "Mersenne, Marin",
		"number": 5,
		"year": ""
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 2,
		"year": 1653
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 2,
		"year": 1656
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 2,
		"year": 1658
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 10,
		"year": 1659
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 4,
		"year": 1660
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 3,
		"year": 1661
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 1,
		"year": 1662
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 7,
		"year": 1663
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 2,
		"year": 1664
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 2,
		"year": 1665
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 3,
		"year": 1668
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 7,
		"year": 1669
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 2,
		"year": 1674
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 3,
		"year": 1675
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 8,
		"year": 1677
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 1,
		"year": 1678
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 4,
		"year": 1679
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 3,
		"year": 1681
	},
	{
		"CatalogueId": "NIEROP",
		"Catalogue": "Nierop, Dirck Rembrantsz van",
		"number": 14,
		"year": 1682
	},
	{
		"CatalogueId": "",
		"Catalogue": "No catalogue specified",
		"number": 1,
		"year": 1680
	},
	{
		"CatalogueId": "",
		"Catalogue": "No catalogue specified",
		"number": 2,
		"year": 1688
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 1,
		"year": 1641
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 7,
		"year": 1653
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 17,
		"year": 1654
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 9,
		"year": 1655
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 13,
		"year": 1656
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 20,
		"year": 1657
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 34,
		"year": 1658
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 84,
		"year": 1659
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 43,
		"year": 1660
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 14,
		"year": 1661
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 9,
		"year": 1662
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 52,
		"year": 1663
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 60,
		"year": 1664
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 119,
		"year": 1665
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 113,
		"year": 1666
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 153,
		"year": 1667
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 316,
		"year": 1668
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 299,
		"year": 1669
	},
	{
		"CatalogueId": "OLDENBURG",
		"Catalogue": "Oldenburg, Henry",
		"number": 221,
		"year": 1670
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 1,
		"year": 1556
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 1,
		"year": 1557
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 2,
		"year": 1559
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 2,
		"year": 1561
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 1,
		"year": 1563
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 1,
		"year": 1564
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 2,
		"year": 1565
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 2,
		"year": 1566
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 6,
		"year": 1567
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 5,
		"year": 1568
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 1,
		"year": 1569
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 8,
		"year": 1570
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 5,
		"year": 1571
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 9,
		"year": 1572
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 8,
		"year": 1573
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 12,
		"year": 1574
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 11,
		"year": 1575
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 4,
		"year": 1576
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 8,
		"year": 1577
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 10,
		"year": 1578
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 16,
		"year": 1579
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 12,
		"year": 1580
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 16,
		"year": 1581
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 18,
		"year": 1582
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 16,
		"year": 1583
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 21,
		"year": 1584
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 2,
		"year": 1585
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 9,
		"year": 1586
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 7,
		"year": 1587
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 9,
		"year": 1588
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 10,
		"year": 1589
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 17,
		"year": 1590
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 26,
		"year": 1591
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 29,
		"year": 1592
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 26,
		"year": 1593
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 32,
		"year": 1594
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 23,
		"year": 1595
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 26,
		"year": 1596
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 25,
		"year": 1597
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 11,
		"year": 1598
	},
	{
		"CatalogueId": "ORTELIUS",
		"Catalogue": "Ortelius, Abraham",
		"number": 17,
		"year": ""
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 2,
		"year": 1524
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1534
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1540
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1549
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1562
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1564
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1577
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1581
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1583
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1584
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1588
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 3,
		"year": 1589
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 2,
		"year": 1590
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1591
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1592
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 2,
		"year": 1593
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 2,
		"year": 1595
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1597
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 2,
		"year": 1598
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1599
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1601
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 2,
		"year": 1602
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 6,
		"year": 1603
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1604
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 3,
		"year": 1606
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 8,
		"year": 1607
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 2,
		"year": 1608
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 5,
		"year": 1609
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 3,
		"year": 1610
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 2,
		"year": 1612
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 3,
		"year": 1613
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1617
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1620
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 2,
		"year": 1623
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 3,
		"year": 1624
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1625
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 1,
		"year": 1629
	},
	{
		"CatalogueId": "ORTELIUS2",
		"Catalogue": "Ortelius-related correspondence",
		"number": 2,
		"year": ""
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 6,
		"year": 1602
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 5,
		"year": 1603
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 2,
		"year": 1604
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 1,
		"year": 1605
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 4,
		"year": 1606
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 3,
		"year": 1608
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 7,
		"year": 1609
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 2,
		"year": 1610
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 3,
		"year": 1611
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 6,
		"year": 1613
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 6,
		"year": 1614
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 4,
		"year": 1615
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 3,
		"year": 1616
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 12,
		"year": 1617
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 28,
		"year": 1618
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 26,
		"year": 1619
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 25,
		"year": 1620
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 44,
		"year": 1621
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 36,
		"year": 1622
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 8,
		"year": 1623
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 50,
		"year": 1624
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 90,
		"year": 1625
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 109,
		"year": 1626
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 126,
		"year": 1627
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 118,
		"year": 1628
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 91,
		"year": 1629
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 48,
		"year": 1630
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 49,
		"year": 1631
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 91,
		"year": 1632
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 223,
		"year": 1633
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 187,
		"year": 1634
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 223,
		"year": 1635
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 126,
		"year": 1636
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 69,
		"year": 1637
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 4,
		"year": 1639
	},
	{
		"CatalogueId": "PEIRESC",
		"Catalogue": "Peiresc, Nicolas-Claude Fabri de",
		"number": 8,
		"year": ""
	},
	{
		"CatalogueId": "PERMEIER",
		"Catalogue": "Permeier, Johann",
		"number": 2,
		"year": 1637
	},
	{
		"CatalogueId": "PERMEIER",
		"Catalogue": "Permeier, Johann",
		"number": 74,
		"year": 1638
	},
	{
		"CatalogueId": "PERMEIER",
		"Catalogue": "Permeier, Johann",
		"number": 4,
		"year": 1641
	},
	{
		"CatalogueId": "PERMEIER",
		"Catalogue": "Permeier, Johann",
		"number": 9,
		"year": ""
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 1,
		"year": 1675
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 4,
		"year": 1676
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 5,
		"year": 1681
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 5,
		"year": 1682
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 18,
		"year": 1683
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 17,
		"year": 1684
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 10,
		"year": 1685
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 5,
		"year": 1686
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 1,
		"year": 1687
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 5,
		"year": 1688
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 3,
		"year": 1689
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 5,
		"year": 1690
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 4,
		"year": 1691
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 9,
		"year": 1692
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 5,
		"year": 1693
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 3,
		"year": 1694
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 4,
		"year": 1695
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 2,
		"year": 1696
	},
	{
		"CatalogueId": "PLOT",
		"Catalogue": "Plot, Robert",
		"number": 2,
		"year": ""
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 3,
		"year": 1584
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 1,
		"year": 1588
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 4,
		"year": 1589
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 5,
		"year": 1590
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 3,
		"year": 1591
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 8,
		"year": 1592
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 11,
		"year": 1593
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 13,
		"year": 1594
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 5,
		"year": 1595
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 17,
		"year": 1596
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 19,
		"year": 1597
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 15,
		"year": 1598
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 39,
		"year": 1599
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 33,
		"year": 1600
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 16,
		"year": 1601
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 19,
		"year": 1602
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 29,
		"year": 1603
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 11,
		"year": 1604
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 18,
		"year": 1605
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 11,
		"year": 1606
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 3,
		"year": 1607
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 3,
		"year": 1608
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 6,
		"year": 1609
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 7,
		"year": 1610
	},
	{
		"CatalogueId": "POLANUS",
		"Catalogue": "Polanus von Polansdorf, Amandus",
		"number": 26,
		"year": ""
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 1,
		"year": 1595
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 1,
		"year": 1596
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 1,
		"year": 1597
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 2,
		"year": 1598
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 1,
		"year": 1600
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 5,
		"year": 1605
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 14,
		"year": 1606
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 7,
		"year": 1607
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 12,
		"year": 1608
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 2,
		"year": 1609
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 1,
		"year": 1610
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 2,
		"year": 1611
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 4,
		"year": 1612
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 5,
		"year": 1613
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 3,
		"year": 1614
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 5,
		"year": 1615
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 1,
		"year": 1616
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 3,
		"year": 1617
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 2,
		"year": 1618
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 3,
		"year": 1620
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 6,
		"year": 1621
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 4,
		"year": 1622
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 2,
		"year": 1623
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 5,
		"year": 1624
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 1,
		"year": 1625
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 3,
		"year": 1626
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 6,
		"year": 1627
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 16,
		"year": 1628
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 12,
		"year": 1629
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 14,
		"year": 1630
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 32,
		"year": 1631
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 15,
		"year": 1632
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 23,
		"year": 1633
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 18,
		"year": 1634
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 19,
		"year": 1635
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 14,
		"year": 1636
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 20,
		"year": 1637
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 10,
		"year": 1638
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 14,
		"year": 1639
	},
	{
		"CatalogueId": "PONTANUS",
		"Catalogue": "Pontanus, Johannes Isacius",
		"number": 12,
		"year": ""
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 1,
		"year": 1600
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 6,
		"year": 1601
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 7,
		"year": 1602
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 42,
		"year": 1603
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 7,
		"year": 1604
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 9,
		"year": 1605
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 19,
		"year": 1606
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 16,
		"year": 1607
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 9,
		"year": 1608
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 7,
		"year": 1609
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 1,
		"year": 1610
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 9,
		"year": 1611
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 4,
		"year": 1612
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 1,
		"year": 1613
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 5,
		"year": 1614
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 1,
		"year": 1615
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 5,
		"year": 1616
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 15,
		"year": 1617
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 21,
		"year": 1618
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 15,
		"year": 1619
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 12,
		"year": 1620
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 28,
		"year": 1621
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 69,
		"year": 1622
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 50,
		"year": 1623
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 15,
		"year": 1624
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 24,
		"year": 1625
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 28,
		"year": 1626
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 86,
		"year": 1627
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 62,
		"year": 1628
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 88,
		"year": 1629
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 41,
		"year": 1630
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 34,
		"year": 1631
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 19,
		"year": 1632
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 22,
		"year": 1633
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 16,
		"year": 1634
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 29,
		"year": 1635
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 8,
		"year": 1636
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 13,
		"year": 1637
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 27,
		"year": 1638
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 17,
		"year": 1639
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 44,
		"year": 1640
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 5,
		"year": 1641
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 1,
		"year": 1643
	},
	{
		"CatalogueId": "RUBENS",
		"Catalogue": "Rubens, Peter Paul",
		"number": 1,
		"year": 1649
	},
	{
		"CatalogueId": "SACHS",
		"Catalogue": "Sachs von Löwenheim, Philipp Jakob",
		"number": 1,
		"year": 1648
	},
	{
		"CatalogueId": "SACHS",
		"Catalogue": "Sachs von Löwenheim, Philipp Jakob",
		"number": 1,
		"year": 1658
	},
	{
		"CatalogueId": "SACHS",
		"Catalogue": "Sachs von Löwenheim, Philipp Jakob",
		"number": 2,
		"year": 1660
	},
	{
		"CatalogueId": "SACHS",
		"Catalogue": "Sachs von Löwenheim, Philipp Jakob",
		"number": 16,
		"year": 1661
	},
	{
		"CatalogueId": "SACHS",
		"Catalogue": "Sachs von Löwenheim, Philipp Jakob",
		"number": 13,
		"year": 1662
	},
	{
		"CatalogueId": "SACHS",
		"Catalogue": "Sachs von Löwenheim, Philipp Jakob",
		"number": 17,
		"year": 1663
	},
	{
		"CatalogueId": "SACHS",
		"Catalogue": "Sachs von Löwenheim, Philipp Jakob",
		"number": 14,
		"year": 1664
	},
	{
		"CatalogueId": "SACHS",
		"Catalogue": "Sachs von Löwenheim, Philipp Jakob",
		"number": 17,
		"year": 1665
	},
	{
		"CatalogueId": "SACHS",
		"Catalogue": "Sachs von Löwenheim, Philipp Jakob",
		"number": 4,
		"year": 1667
	},
	{
		"CatalogueId": "SACHS",
		"Catalogue": "Sachs von Löwenheim, Philipp Jakob",
		"number": 6,
		"year": 1668
	},
	{
		"CatalogueId": "SACHS",
		"Catalogue": "Sachs von Löwenheim, Philipp Jakob",
		"number": 6,
		"year": 1669
	},
	{
		"CatalogueId": "SACHS",
		"Catalogue": "Sachs von Löwenheim, Philipp Jakob",
		"number": 15,
		"year": 1670
	},
	{
		"CatalogueId": "SACHS",
		"Catalogue": "Sachs von Löwenheim, Philipp Jakob",
		"number": 30,
		"year": 1671
	},
	{
		"CatalogueId": "SACHS",
		"Catalogue": "Sachs von Löwenheim, Philipp Jakob",
		"number": 1,
		"year": 1672
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 1,
		"year": 1561
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 1,
		"year": 1564
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 1,
		"year": 1565
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 1,
		"year": 1566
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 4,
		"year": 1568
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 4,
		"year": 1571
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 6,
		"year": 1572
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 4,
		"year": 1573
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 10,
		"year": 1574
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 16,
		"year": 1575
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 15,
		"year": 1576
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 6,
		"year": 1577
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 6,
		"year": 1578
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 18,
		"year": 1579
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 6,
		"year": 1580
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 9,
		"year": 1581
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 5,
		"year": 1582
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 17,
		"year": 1583
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 23,
		"year": 1584
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 21,
		"year": 1585
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 20,
		"year": 1586
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 14,
		"year": 1587
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 21,
		"year": 1588
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 6,
		"year": 1589
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 11,
		"year": 1590
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 31,
		"year": 1591
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 26,
		"year": 1592
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 39,
		"year": 1593
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 40,
		"year": 1594
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 47,
		"year": 1595
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 27,
		"year": 1596
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 29,
		"year": 1597
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 55,
		"year": 1598
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 48,
		"year": 1599
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 76,
		"year": 1600
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 98,
		"year": 1601
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 147,
		"year": 1602
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 132,
		"year": 1603
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 110,
		"year": 1604
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 136,
		"year": 1605
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 142,
		"year": 1606
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 125,
		"year": 1607
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 103,
		"year": 1608
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 2,
		"year": 1609
	},
	{
		"CatalogueId": "SCALIGER",
		"Catalogue": "Scaliger, Joseph Justus",
		"number": 10,
		"year": ""
	},
	{
		"CatalogueId": "SCHOTT",
		"Catalogue": "Schott, Caspar",
		"number": 1,
		"year": 1650
	},
	{
		"CatalogueId": "SCHOTT",
		"Catalogue": "Schott, Caspar",
		"number": 2,
		"year": 1652
	},
	{
		"CatalogueId": "SCHOTT",
		"Catalogue": "Schott, Caspar",
		"number": 1,
		"year": 1653
	},
	{
		"CatalogueId": "SCHOTT",
		"Catalogue": "Schott, Caspar",
		"number": 8,
		"year": 1655
	},
	{
		"CatalogueId": "SCHOTT",
		"Catalogue": "Schott, Caspar",
		"number": 11,
		"year": 1656
	},
	{
		"CatalogueId": "SCHOTT",
		"Catalogue": "Schott, Caspar",
		"number": 12,
		"year": 1657
	},
	{
		"CatalogueId": "SCHOTT",
		"Catalogue": "Schott, Caspar",
		"number": 14,
		"year": 1658
	},
	{
		"CatalogueId": "SCHOTT",
		"Catalogue": "Schott, Caspar",
		"number": 8,
		"year": 1659
	},
	{
		"CatalogueId": "SCHOTT",
		"Catalogue": "Schott, Caspar",
		"number": 6,
		"year": 1660
	},
	{
		"CatalogueId": "SCHOTT",
		"Catalogue": "Schott, Caspar",
		"number": 15,
		"year": 1661
	},
	{
		"CatalogueId": "SCHOTT",
		"Catalogue": "Schott, Caspar",
		"number": 26,
		"year": 1662
	},
	{
		"CatalogueId": "SCHOTT",
		"Catalogue": "Schott, Caspar",
		"number": 11,
		"year": 1663
	},
	{
		"CatalogueId": "SCHOTT",
		"Catalogue": "Schott, Caspar",
		"number": 10,
		"year": 1664
	},
	{
		"CatalogueId": "SCHOTT",
		"Catalogue": "Schott, Caspar",
		"number": 38,
		"year": 1665
	},
	{
		"CatalogueId": "SCHOTT",
		"Catalogue": "Schott, Caspar",
		"number": 7,
		"year": 1666
	},
	{
		"CatalogueId": "SCHOTT",
		"Catalogue": "Schott, Caspar",
		"number": 5,
		"year": ""
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 1,
		"year": 1615
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 2,
		"year": 1616
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 11,
		"year": 1618
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 1,
		"year": 1619
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 4,
		"year": 1620
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 3,
		"year": 1621
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 6,
		"year": 1622
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 2,
		"year": 1623
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 2,
		"year": 1624
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 5,
		"year": 1625
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 3,
		"year": 1626
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 11,
		"year": 1627
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 1,
		"year": 1628
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 4,
		"year": 1629
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 2,
		"year": 1630
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 2,
		"year": 1631
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 4,
		"year": 1632
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 3,
		"year": 1633
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 3,
		"year": 1634
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 6,
		"year": 1635
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 11,
		"year": 1636
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 11,
		"year": 1637
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 6,
		"year": 1638
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 9,
		"year": 1639
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 6,
		"year": 1640
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 5,
		"year": 1641
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 12,
		"year": 1642
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 10,
		"year": 1643
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 5,
		"year": 1644
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 10,
		"year": 1645
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 6,
		"year": 1646
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 10,
		"year": 1647
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 20,
		"year": 1648
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 3,
		"year": 1649
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 9,
		"year": 1650
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 34,
		"year": 1651
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 30,
		"year": 1652
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 46,
		"year": 1653
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 16,
		"year": 1654
	},
	{
		"CatalogueId": "SELDEN",
		"Catalogue": "Selden, John",
		"number": 20,
		"year": ""
	},
	{
		"CatalogueId": "SIDNEY",
		"Catalogue": "Sidney, Philip",
		"number": 1,
		"year": 1566
	},
	{
		"CatalogueId": "SIDNEY",
		"Catalogue": "Sidney, Philip",
		"number": 2,
		"year": 1569
	},
	{
		"CatalogueId": "SIDNEY",
		"Catalogue": "Sidney, Philip",
		"number": 1,
		"year": 1570
	},
	{
		"CatalogueId": "SIDNEY",
		"Catalogue": "Sidney, Philip",
		"number": 19,
		"year": 1573
	},
	{
		"CatalogueId": "SIDNEY",
		"Catalogue": "Sidney, Philip",
		"number": 66,
		"year": 1574
	},
	{
		"CatalogueId": "SIDNEY",
		"Catalogue": "Sidney, Philip",
		"number": 58,
		"year": 1575
	},
	{
		"CatalogueId": "SIDNEY",
		"Catalogue": "Sidney, Philip",
		"number": 29,
		"year": 1576
	},
	{
		"CatalogueId": "SIDNEY",
		"Catalogue": "Sidney, Philip",
		"number": 23,
		"year": 1577
	},
	{
		"CatalogueId": "SIDNEY",
		"Catalogue": "Sidney, Philip",
		"number": 17,
		"year": 1578
	},
	{
		"CatalogueId": "SIDNEY",
		"Catalogue": "Sidney, Philip",
		"number": 17,
		"year": 1579
	},
	{
		"CatalogueId": "SIDNEY",
		"Catalogue": "Sidney, Philip",
		"number": 18,
		"year": 1580
	},
	{
		"CatalogueId": "SIDNEY",
		"Catalogue": "Sidney, Philip",
		"number": 17,
		"year": 1581
	},
	{
		"CatalogueId": "SIDNEY",
		"Catalogue": "Sidney, Philip",
		"number": 3,
		"year": 1582
	},
	{
		"CatalogueId": "SIDNEY",
		"Catalogue": "Sidney, Philip",
		"number": 7,
		"year": 1583
	},
	{
		"CatalogueId": "SIDNEY",
		"Catalogue": "Sidney, Philip",
		"number": 6,
		"year": 1584
	},
	{
		"CatalogueId": "SIDNEY",
		"Catalogue": "Sidney, Philip",
		"number": 28,
		"year": 1585
	},
	{
		"CatalogueId": "SIDNEY",
		"Catalogue": "Sidney, Philip",
		"number": 68,
		"year": 1586
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 1,
		"year": 1627
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 1,
		"year": 1629
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 2,
		"year": 1631
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 2,
		"year": 1632
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 16,
		"year": 1633
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 25,
		"year": 1634
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 50,
		"year": 1635
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 27,
		"year": 1636
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 71,
		"year": 1637
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 66,
		"year": 1638
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 67,
		"year": 1639
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 64,
		"year": 1640
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 73,
		"year": 1641
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 55,
		"year": 1642
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 52,
		"year": 1643
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 67,
		"year": 1644
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 106,
		"year": 1645
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 60,
		"year": 1646
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 3,
		"year": 1647
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 3,
		"year": 1648
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 4,
		"year": 1649
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 16,
		"year": 1650
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 70,
		"year": 1651
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 16,
		"year": 1652
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 1,
		"year": 1653
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 3,
		"year": 1654
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 4,
		"year": 1655
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 5,
		"year": 1657
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 2,
		"year": 1658
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 4,
		"year": 1659
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 4,
		"year": 1660
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 11,
		"year": 1661
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 41,
		"year": 1662
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 44,
		"year": 1663
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 48,
		"year": 1664
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 30,
		"year": 1665
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 8,
		"year": 1666
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 5,
		"year": 1668
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 1,
		"year": 1669
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 2,
		"year": 1670
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 1,
		"year": 1671
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 4,
		"year": 1672
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 1,
		"year": 1674
	},
	{
		"CatalogueId": "AMALIA",
		"Catalogue": "Solms-Braunfels, Amalia von",
		"number": 10,
		"year": ""
	},
	{
		"CatalogueId": "SWAMMERDAM",
		"Catalogue": "Swammerdam, Jan",
		"number": 1,
		"year": 1664
	},
	{
		"CatalogueId": "SWAMMERDAM",
		"Catalogue": "Swammerdam, Jan",
		"number": 2,
		"year": 1665
	},
	{
		"CatalogueId": "SWAMMERDAM",
		"Catalogue": "Swammerdam, Jan",
		"number": 5,
		"year": 1666
	},
	{
		"CatalogueId": "SWAMMERDAM",
		"Catalogue": "Swammerdam, Jan",
		"number": 5,
		"year": 1667
	},
	{
		"CatalogueId": "SWAMMERDAM",
		"Catalogue": "Swammerdam, Jan",
		"number": 3,
		"year": 1668
	},
	{
		"CatalogueId": "SWAMMERDAM",
		"Catalogue": "Swammerdam, Jan",
		"number": 2,
		"year": 1669
	},
	{
		"CatalogueId": "SWAMMERDAM",
		"Catalogue": "Swammerdam, Jan",
		"number": 2,
		"year": 1670
	},
	{
		"CatalogueId": "SWAMMERDAM",
		"Catalogue": "Swammerdam, Jan",
		"number": 10,
		"year": 1671
	},
	{
		"CatalogueId": "SWAMMERDAM",
		"Catalogue": "Swammerdam, Jan",
		"number": 10,
		"year": 1672
	},
	{
		"CatalogueId": "SWAMMERDAM",
		"Catalogue": "Swammerdam, Jan",
		"number": 11,
		"year": 1673
	},
	{
		"CatalogueId": "SWAMMERDAM",
		"Catalogue": "Swammerdam, Jan",
		"number": 15,
		"year": 1674
	},
	{
		"CatalogueId": "SWAMMERDAM",
		"Catalogue": "Swammerdam, Jan",
		"number": 12,
		"year": 1675
	},
	{
		"CatalogueId": "SWAMMERDAM",
		"Catalogue": "Swammerdam, Jan",
		"number": 28,
		"year": 1676
	},
	{
		"CatalogueId": "SWAMMERDAM",
		"Catalogue": "Swammerdam, Jan",
		"number": 10,
		"year": 1677
	},
	{
		"CatalogueId": "SWAMMERDAM",
		"Catalogue": "Swammerdam, Jan",
		"number": 34,
		"year": 1678
	},
	{
		"CatalogueId": "SWAMMERDAM",
		"Catalogue": "Swammerdam, Jan",
		"number": 20,
		"year": 1679
	},
	{
		"CatalogueId": "SWAMMERDAM",
		"Catalogue": "Swammerdam, Jan",
		"number": 2,
		"year": 1680
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 1,
		"year": 1617
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 1,
		"year": 1619
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 1,
		"year": 1620
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 5,
		"year": 1621
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 2,
		"year": 1623
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 1,
		"year": 1626
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 1,
		"year": 1630
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 1,
		"year": 1635
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 3,
		"year": 1636
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 1,
		"year": 1637
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 1,
		"year": 1638
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 3,
		"year": 1639
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 3,
		"year": 1643
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 2,
		"year": 1646
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 1,
		"year": 1654
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 1,
		"year": 1655
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 1,
		"year": 1656
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 4,
		"year": 1658
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 1,
		"year": 1662
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 2,
		"year": 1668
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 1,
		"year": 1672
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 1,
		"year": 1673
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 1,
		"year": 1674
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 1,
		"year": 1677
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 1,
		"year": 1684
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 1,
		"year": 1686
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 2,
		"year": 1690
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 2,
		"year": 1702
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 2,
		"year": 1703
	},
	{
		"CatalogueId": "TIXALL",
		"Catalogue": "Tixall letters",
		"number": 47,
		"year": ""
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 1,
		"year": 1632
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 1,
		"year": 1636
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 3,
		"year": 1637
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 28,
		"year": 1638
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 24,
		"year": 1639
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 22,
		"year": 1640
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 34,
		"year": 1641
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 44,
		"year": 1642
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 31,
		"year": 1643
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 49,
		"year": 1644
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 51,
		"year": 1645
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 50,
		"year": 1646
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 62,
		"year": 1647
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 101,
		"year": 1648
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 54,
		"year": 1649
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 66,
		"year": 1650
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 85,
		"year": 1651
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 79,
		"year": 1652
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 56,
		"year": 1653
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 22,
		"year": 1654
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 11,
		"year": 1655
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 14,
		"year": 1656
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 5,
		"year": 1657
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 7,
		"year": 1658
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 33,
		"year": 1659
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 22,
		"year": 1660
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 22,
		"year": 1661
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 18,
		"year": 1662
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 26,
		"year": 1663
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 13,
		"year": 1664
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 28,
		"year": 1665
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 25,
		"year": 1666
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 15,
		"year": 1667
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 28,
		"year": 1668
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 15,
		"year": 1669
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 12,
		"year": 1670
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 9,
		"year": 1671
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 3,
		"year": 1672
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 4,
		"year": 1673
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 9,
		"year": 1674
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 7,
		"year": 1675
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 5,
		"year": 1676
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 11,
		"year": 1677
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 2,
		"year": 1678
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 23,
		"year": 1679
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 12,
		"year": 1680
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 11,
		"year": 1681
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 9,
		"year": 1682
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 15,
		"year": 1683
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 13,
		"year": 1684
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 13,
		"year": 1685
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 11,
		"year": 1686
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 18,
		"year": 1687
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 18,
		"year": 1688
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 2,
		"year": 1689
	},
	{
		"CatalogueId": "VOSSIUSISAAC",
		"Catalogue": "Vossius, Isaac",
		"number": 350,
		"year": ""
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 3,
		"year": 1641
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 3,
		"year": 1643
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 1,
		"year": 1645
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 3,
		"year": 1648
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 3,
		"year": 1649
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 12,
		"year": 1650
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 7,
		"year": 1651
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 9,
		"year": 1652
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 6,
		"year": 1653
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 4,
		"year": 1654
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 22,
		"year": 1655
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 21,
		"year": 1656
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 37,
		"year": 1657
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 63,
		"year": 1658
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 16,
		"year": 1659
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 9,
		"year": 1660
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 16,
		"year": 1661
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 20,
		"year": 1662
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 10,
		"year": 1663
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 40,
		"year": 1664
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 16,
		"year": 1665
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 36,
		"year": 1666
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 38,
		"year": 1667
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 149,
		"year": 1668
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 89,
		"year": 1669
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 76,
		"year": 1670
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 61,
		"year": 1671
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 59,
		"year": 1672
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 65,
		"year": 1673
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 61,
		"year": 1674
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 59,
		"year": 1675
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 33,
		"year": 1676
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 28,
		"year": 1677
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 36,
		"year": 1678
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 8,
		"year": 1679
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 5,
		"year": 1680
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 20,
		"year": 1681
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 14,
		"year": 1682
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 22,
		"year": 1683
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 52,
		"year": 1684
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 40,
		"year": 1685
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 24,
		"year": 1686
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 26,
		"year": 1687
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 57,
		"year": 1688
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 65,
		"year": 1689
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 63,
		"year": 1690
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 84,
		"year": 1691
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 48,
		"year": 1692
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 30,
		"year": 1693
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 13,
		"year": 1694
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 52,
		"year": 1695
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 23,
		"year": 1696
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 32,
		"year": 1697
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 37,
		"year": 1698
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 72,
		"year": 1699
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 39,
		"year": 1700
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 28,
		"year": 1701
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 23,
		"year": 1702
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 12,
		"year": 1703
	},
	{
		"CatalogueId": "WALLIS",
		"Catalogue": "Wallis, John",
		"number": 1,
		"year": ""
	}
];
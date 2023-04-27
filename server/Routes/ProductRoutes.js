import express from "express";
import Product from "../Models/ProductModel.js"



 
const productRouter = express.Router();


//General

productRouter.get(
    "/summary",
    async (req, res) => {

      try {


        //Likelihood Sum Chart
        const likelihoodRange = await Product.aggregate([

          {
            $group: { 
              _id: "$likelihood",
               totalLikelihood: { $sum: 1 } 
              }
          }    
  
        ]);


        // Intensity Sum Chart
        const intensityRange = await Product.aggregate([

          { 
            $match : { topic : "gas" } 
          },

          {
            $group: { 
              _id: "$intensity",
               totalIntensity: { $sum: 1 } 
              }
          }    
  
        ]);


        // Relevance Sum Chart
        const relevanceRange = await Product.aggregate([

          {
            $group: { 
              _id: "$relevance",
               totalRelevance: { $sum: 1 } 
              }
          }    
  
        ]);


        // Country Sum Chart
        const countryRange = await Product.aggregate([

          {
            $group: { 
              _id: "$country",
               totalCountry: { $sum: 1 } 
              }
          },
  
        ]);


         // Topic Sum Chart
         const topicRange = await Product.aggregate([

          {
            $group: { 
              _id: "$topic",
               totalTopic: { $sum: 1 } 
              }
          }    
  
        ]);


        // Region Sum Chart
        const regionRange = await Product.aggregate([

          {
            $group: { 
              _id: "$region",
               totalRegion: { $sum: 1 } 
              }
          }    
  
        ]);


        // Date Sum Chart
        // const addedRange = await Product.aggregate([

        //   {
        //     $group: { 
        //         _id: { $year: "$added" },
        //        totalAdded: { $sum: 1 } 
        //       }
        //   }    
  
        // ]);


        //Sector Sum Chart
        
        
        const sectorRange = await Product.aggregate([

          {
            $group: { 
              _id: "$sector",
              totalSector: { $sum: 1 } 
              }
          }    

        ]);


        // Source Sum Chart
        const sourceRange = await Product.aggregate([

          {
            $group: { 
              _id: "$source",
              totalSource: { $sum: 1 } 
              }
          }    

        ]);


const sourceOptions = [
  "Middle East Online",
  "Newsletter",
  "Australian Government Department of Defence",
  "FashionNetwork.com",
  "ReadWrite",
  "Russia Beyond The Headlines",
  "Resilience",
  "VITA Technologies",
  "International Business Times",
  "EV Obsession",
  "IRENA newsroom",
  "SBWire",
  "Gas 2",
  "Gii Research",
  "MIT Technology Review",
  "Arangkada Philippines",
  "Eco-Business.com",
  "cpzulia",
  "Oxfam",
  "World Bank",
  "BBC News Technology",
  "newscientist",
  "International Banker",
  "Handelsblatt Global Edition",
  "dpaq",
  "atradius",
  "Sydney Morning Herald",
  "biologicaldiversity",
  "Carbon Brief",
  "IMF",
  "djsresearch",
  "Hardin Tibbs",
  "energy news cyprus",
  "Eurasia Group",
  "Renewable Energy World",
  "Resources for the Future",
  "Hospitality Trends",
  "MENA-Forum",
  "unian",
  "CAFrackFacts",
  "Yes Bank",
  "Fews Net",
  "ID TECH INDEX",
  "Investopedia",
  "Maplecroft",
  "INSEAD Knowledge",
  "CDC",
  "Cornell University",
  "Fitch",
  "Phys Org",
  "IASTOPPERS",
  "The Chirographer",
  "THE LEAGUE OF WOMEN VOTERS® OF THE FAIRFAX AREA",
  "Vox",
  "WSJ",
  "controleng",
  "agriworldsa",
  "Pickens Plan",
  "Yahoo Finance Canada",
  "Citibank",
  "Farms.com",
  "Transport Environment",
  "Justmeans",
  "World Health",
  "dailytexanonline",
  "International Monetary Fund (IMF)",
  "Energy.gov Website",
  "iMFdirect - The IMF Blog",
  "njc-cnm",
  "theicct",
  "Stanford News",
  "Europa",
  "thespanisheconomy",
  "Yahoo Finance",
  "Nexus Conference",
  "bankofcanada",
  "Imeche",
  "ethicalmarkets",
  "Politico",
  "Canadian Biomass",
  "Vanguard News",
  "Countries.com Global Content",
  "Environmental Leader",
  "Le·gal In·sur·rec·tion",
  "Guardian Sustainable Business",
  "CBO",
  "World Energy News",
  "War on the Rocks",
  "The Atlantic",
  "The Engineer",
  "ISA",
  "Ocean Acidification",
  "LiveMint",
  "Bloomberg Business",
  "Adam Curry",
  "sustainablebrands.com",
  "CNNMoney",
  "amundi",
  "farms",
  "Biofuels Digest",
  "g7g20",
  "MAPI",
  "ebrd",
  "Wall Street Daily",
  "europeanclimate",
  "The Jamestown Foundation",
  "Future in Focus",
  "Real Estate Professional",
  "RUSI",
  "environmentalpeacebuilding",
  "UNEP",
  "Future Timeline",
  "Aljazeera.com",
  "Bloomberg New Energy Finance",
  "Wired UK",
  "murc",
  "TheNews.NG",
  "USDA",
  "Zawya",
  "Nature",
  "Industry Week",
  "TRAC News",
  "Common Dreams",
  "New Security Beat",
  "ihsmarkit",
  "EY",
  "Drill or drop?",
  "UK Government",
  "University of Chicago",
  "Business Wire",
  "clientadvisoryservices",
  "JD Supra",
  "Planetsave",
  "AgWeb - The Home Page of Agriculture",
  "idc-community",
  "khorreports-palmoil",
  "Tech Times",
  "NDTV",
  "Euromoney",
  "globalizationpartners",
  "Fox Business",
  "therobotreport",
  "gasstrategies",
  "The Economist",
  "Washington Post",
  "Motor Magazine",
  "Government of Ireland",
  "Energy Tomorrow",
  "National Geographic Society (blogs)",
  "Atlantic Council",
  "greenerearthnews",
  "uschamber",
  "Futurity",
  "Huffington Post",
  "Freedonia",
  "About Best Binary Options Strategy",
  "marketrealist",
  "Society of Motor Manufacturers and Traders (SMMT)",
  "What's Next",
  "aswm",
  "Planetizen",
  "Nation of Change",
  "Days Of Year",
  "worldenergy",
  "Cushman & Wakefield",
  "McKinsey & Company",
  "Business Insider",
  "Jachin Capital",
  "Nanotechnology Innovation",
  "edie.net",
  "Tactical Investor",
  "Verisk Maplecroft",
  "Bearnobull",
  "Koenig Investment Advisory",
  "IRENA",
  "The Jakarta Post",
  "metalprices",
  "EIA",
  "The Next Web",
  "The Conversation",
  "Project Syndicate",
  "Gartner",
  "CleanTechnica",
  "OMFIF",
  "ESPAS",
  "EE News",
  "satprnews",
  "Inside Climate News",
  "Azonano",
  "PriceWaterhouseCoopers",
  "Mind Commerce",
  "Physics World",
  "Channel News Asia",
  "IEA",
  "CSIS",
  "ecesr",
  "Technavio",
  "GlobalMeatNews.com",
  "Innovate UK",
  "Oil and Gas Journal",
  "Europe in My Region",
  "EPS News",
  "Business Standard",
  "European Central Bank",
  "ETEnergyworld.com",
  "THISDAY LIVE",
  "The Globe and Mail",
  "SlideShare",
  "Shenandoah",
  "U.K. Ministry of Defense",
  "Thomson Reuters",
  "Transport Evolved",
  "biomassmagazine",
  "prsync",
  "Cii Radio",
  "NY Times",
  "ethicalconsumer",
  "Cushman & Wakefield Blog",
  "Edge and Odds",
  "Science Daily",
  "Informed Choice Chartered Financial Planners in Cranleigh",
  "EGYPS",
  "LNG",
  "nextbigfuture",
  "Guardian",
  "African Development Bank",
  "Middle East Eye",
  "Global Money Trends",
  "McKinsey Quarterly",
  "Slinking Toward Retirement",
  "University of Latvia",
  "Utility Dive",
  "Interior Design",
  "economy",
  "EIU",
  "FX Empire",
  "Scania Group",
  "Worldly",
  "Before It's News | Alternative News | UFO | Beyond Science | True News| Prophecy News | People Powered News",
  "European Environment Agency",
  "Climate Change News",
  "Lawfare",
  "AHDB",
  "Elsevier",
  "OklahomaMinerals.com",
  "platts",
  "Time",
  "The American Prospect",
  "4th Annual Congress and Expo on Biofuels and Bioenergy April 27-28 2017 Dubai UAE",
  "www.narendramodi.in",
  "Infracircle",
  "globalfueleconomy",
  "Activist Post",
  "Robothub",
  "News",
  "World Bank Group",
  "Wikipedia",
  "Fast Co-Exist",
  "Foreign Policy",
  "TheCable",
  "Blue and Green Tomorrow",
  "iamericas",
  "RiskMap 2017",
  "IER",
  "The Market Mogul",
  "Embedded Computing Design",
  "energyglobal",
  "friday-thinking",
  "nbp",
  "Triple Pundit",
  "The Guardian",
  "3D Printing Progress",
  "South World",
  "Manufacturing Operations Technology Viewpoints",
  "DOE EIA 2013 Energy Conference",
  "Media Center",
  "Critical Threats",
  "Smart Grid Observer",
  "bankofengland",
  "Business Green",
  "globalr2p",
  "The Independent",
  "Freenewspos",
  "Peak Prosperity",
  "Science News",
  "OPEC",
  "Rigzone",
  "CCN: Financial Bitcoin & Cryptocurrency News",
  "Global Money Trends Magazine",
  "Sputnik News",
  "EPA",
  "Finance Magnates",
  "worldculturepictorial",
  "Face2face Africa",
  "nbk",
  "TeleTrade",
  "NWF",
  "PwC",
  "Gizmodo Australia",
  "South Sudan News Agency",
  "Zero Hedge",
  "AMERICAN COUNCIL ON SCIENCE AND HEALTH",
  "Seeking Alpha",
  "BorneoPost Online",
  "Star Tribune",
  "Scientific American",
  "MRC",
  "westpandi",
  "The Mainichi",
  "cargill",
  "IEA.org",
  "Newsweek",
  "inputsmonitor",
  "PR Newswire",
  "Wood McKenzie",
  "Guarini Center",
  "Innovations Report",
  "valburyresearch",
  "No 2 Nuclear Power",
  "Futureseek Link Digest",
  "GE Reports",
  "globalmoneytrends",
  "IBEF",
  "Climate News Network",
  "veteranstoday",
  "Wells Fargo",
  "Future Market Insights",
  "cloudfront",
  "CIO",
  "Mast",
  "Future Earth",
  "IFT",
  "Engineering News",
  "Wharton",
  "oilprice.com",
  "saltlakecityheadlines",
  "CNBC",
  "African Arguments",
  "Institutional Investor",
  "Euler Hermes",
  "DW.COM",
  "FAO",
  "South China Morning Post",
  "portfolioticker",
  "ogauthority",
  "OEM/Lube News",
  "Virgin Atlantic",
  "FutureinFocus",
  "allianzglobalinvestors",
  "Digitalist Magazine",
  "IHS Engineering 360",
  "GreenBiz",
  "Brookings Institute",
  "The Arab Gulf States Institute Washington",
  "European Council",
  "University Chronicle",
  "oilvoice",
  "betterenergy",
  "Predictive Analytics Times",
  "CAJ News Africa",
  "conferenceseries",
  "Drydock Magazine",
  "the star online",
  "Reuters",
  "ECFR",
  "Insurance Journal",
  "Quartz",
  "briandcolwell",
  "Global Information Inc",
  "polymerspaintcolourjournal",
  "News.com",
  "watercanada",
  "Prospects for Development",
  "AllAfrica",
  "Avi Melamed",
  "creamermedia",
  "Australian Government",
  "HBR",
  "FoodQualityNews.com",
  "jeita",
  "Total",
  "Industrial Control Security",
  "Khaleej Times",
  "maltawinds.com",
  "Innovaro",
  "Convenience Store Decisions",
  "arabellaadvisors",
  "Neon Nettle",
  "savepassamaquoddybay",
  "knomad",
  "Abq",
  "The Nation",
  "dailyquiddity",
  "U.S. Environmental Protection Agency",
  "Think Progress",
  "The Ticker Tape",
  "IISS",
  "UNESCO",
  "PDQFX news",
  "VOA",
  "Cars.co.za",
  "MIT Sloan Management Review",
  "Strategy & Formerly Booz & Company",
];

const topicOptions = [
  "unemployment",
  "asylum",
  "ice",
  "food",
  "tension",
  "technology",
  "emission",
  "shortage",
  "tax",
  "greenhouse gas",
  "shale gas",
  "consumer",
  "resource",
  "automaker",
  "pollution",
  "politics",
  "gasoline",
  "building",
  "money",
  "economic growth",
  "market",
  "clothing",
  "export",
  "policy",
  "climate change",
  "power",
  "investment",
  "war",
  "debt",
  "workforce",
  "nuclear",
  "artificial intelligence",
  "work",
  "water",
  "interest rate",
  "wealth",
  "coal",
  "crisis",
  "consumption",
  "robot",
  "inflation",
  "carbon",
  "3D",
  "demand",
  "trade",
  "peak oil",
  "gdp",
  "business",
  "infrastructure",
  "factory",
  "biofuel",
  "communication",
  "economy",
  "government",
  "population",
  "revenue",
  "production",
  "oil",
  "election",
  "plastic",
  "city",
  "material",
  "fracking",
  "brexit",
  "growth",
  "tourist",
  "finance",
  "bank",
  "fossil fuel",
  "farm",
  "car",
  "electricity",
  "data",
  "Washington",
  "energy",
  "worker",
  "aquaculture",
  "change",
  "storm",
  "strategy",
  "transport",
  "security",
  "agriculture",
  "software",
  "vehicle",
  "capital",
  "information",
  "economic",
  "climate",
  "industry",
  "battery",
  "risk",
  "gas",
  "gamification",
  "transportation",
  "administration",
  "terrorism",
];

const sectorOptions = [
  "Security",
  "Manufacturing",
  "Tourism & hospitality",
  "Construction",
  "Transport",
  "Automotive",
  "Energy",
  "Retail",
  "Information Technology",
  "Government",
  "Support services",
  "Environment",
  "Water",
  "Financial services",
  "Aerospace & defence",
  "Media & entertainment",
  "Food & agriculture",
  "Healthcare"

];

const regionOptions = [
  "Western Europe",
  "South-Eastern Asia",
  "Southern Africa",
  "Africa",
  "Eastern Europe",
  "Northern America",
  "Central Africa",
  "Central America",
  "Europe",
  "Southern Europe",
  "Northern Africa",
  "Eastern Asia",
  "Asia",
  "Eastern Africa",
  "South America",
  "Southern Asia",
  "Central Asia",
  "Western Asia",
  "Northern Europe",
  "Western Africa",
  "Oceania"
];



      

        res.send({ 
            likelihoodRange, intensityRange, relevanceRange, countryRange, topicRange, regionRange, sectorRange, sourceRange, 
            topicOptions, sectorOptions, regionOptions, sourceOptions 
        });
    
  
      }

      catch {
        res.status(404).send("No route found");
      }
  
    }
  );


//Filter

productRouter.get(
    "/filter/:id1/:id2",
    async (req, res) => {

      try {


        const filterType = req.params.id1;

        const filterValue = req.params.id2;
   

        console.log("filterValue", filterValue);

        console.log("filterType", filterType);



        //Likelihood Sum Chart
        const likelihoodRange = await Product.aggregate([

          { 
            $match : { [filterType] :  ( filterValue ) } 
          },

          {
            $group: { 
              _id: "$likelihood",
               totalLikelihood: { $sum: 1 } 
              }
          }    
  
        ]);


        // Intensity Sum Chart
        const intensityRange = await Product.aggregate([

          { 
            $match : { [filterType] :  ( filterValue ) } 
          },

          { 
            $match : { topic : "gas" } 
          },

          {
            $group: { 
              _id: "$intensity",
               totalIntensity: { $sum: 1 } 
              }
          }    
  
        ]);


        // Relevance Sum Chart
        const relevanceRange = await Product.aggregate([

          { 
            $match : { [filterType] :  ( filterValue ) } 
          },

          {
            $group: { 
              _id: "$relevance",
               totalRelevance: { $sum: 1 } 
              }
          }    
  
        ]);


        // Country Sum Chart
        const countryRange = await Product.aggregate([

          { 
            $match : { [filterType] :  ( filterValue ) } 
          },

          {
            $group: { 
              _id: "$country",
               totalCountry: { $sum: 1 } 
              }
          },
  
        ]);


         // Topic Sum Chart
         const topicRange = await Product.aggregate([

          { 
            $match : { [filterType] :  ( filterValue ) } 
          },

          {
            $group: { 
              _id: "$topic",
               totalTopic: { $sum: 1 } 
              }
          }    
  
        ]);


        // Region Sum Chart
        const regionRange = await Product.aggregate([

          { 
            $match : { [filterType] :  ( filterValue ) } 
          },

          {
            $group: { 
              _id: "$region",
               totalRegion: { $sum: 1 } 
              }
          }    
  
        ]);


        // Date Sum Chart
        // const addedRange = await Product.aggregate([

        // { 
        //   $match : { [filterType] :  ( filterValue ) } 
        // },

        //   {
        //     $group: { 
        //         _id: { $year: "$added" },
        //        totalAdded: { $sum: 1 } 
        //       }
        //   }    
  
        // ]);


        //Sector Sum Chart
        
        
        const sectorRange = await Product.aggregate([

          { 
            $match : { [filterType] :  ( filterValue ) } 
          },

          {
            $group: { 
              _id: "$sector",
              totalSector: { $sum: 1 } 
              }
          }    

        ]);


        // Source Sum Chart
        const sourceRange = await Product.aggregate([

          { 
            $match : { [filterType] :  ( filterValue ) } 
          },

          {
            $group: { 
              _id: "$source",
              totalSource: { $sum: 1 } 
              }
          }    

        ]);


        res.send({ likelihoodRange, intensityRange, relevanceRange, countryRange, topicRange, regionRange, sectorRange, sourceRange });
    

      }



      catch (err) {
        console.log(err);

      }

    }
  );



// Country

productRouter.get(
    '/country',
    async (req, res) => {

      try {

        const top3Country = await Product.aggregate([

          {
            $group: 
            { 
              _id: {country: "$country"},
               myCount: { $sum: 1 } 
            }
          },

          {
            $sort: {myCount: -1}
          },

          {
            $limit: 3
          },

        
        ]);




        const bottom3Country = await Product.aggregate([

          {
            $group: 
            { 
              _id: {country: "$country"},
               myCount: { $sum: 1 } 
            }
          },

          {
            $sort: {myCount: 1}
          },

          {
            $limit: 3
          }

  
        ]);




        const topLikelihoodCountry = await Product.aggregate([

          { 
            $match : 
            { 
              likelihood : {$gte: 4}
            } 
          },

          {
            $group: 
            { 
              _id: {country: "$country"},
              myCount: { $sum: 1 } 
            }
          },

          {
            $sort: {myCount: -1}
          },

          {
            $limit: 5
          }

         
  
        ]);




        const topRelevanceCountry = await Product.aggregate([

          { 
            $match : 
            { 
              relevance : { $gte: 6 }
            } 
          },

          {
            $group: 
            { 
              _id: {country: "$country"},
              myCount: { $sum: 1 } 
            }
          },

          {
            $sort: {myCount: -1}
          },
         
  
        ]);


        const topIntensityCountry = await Product.aggregate([

          { 
            $match : 
            { 
              intensity : { $gte: 16 }
            } 
          },

          {
            $group: 
            { 
              _id: {country: "$country"},
              myCount: { $sum: 1 } 
            }
          },

          {
            $sort: {myCount: -1}
          },

          {
            $limit: 5
          }
         
  
        ]);



        const countryCount = await Product.aggregate([

          { 
            $group: 
            { 
              _id: {country: "$country"}, 
              count: { $sum: 1 } 
            } 
          },

        ]);


       

        res.send({
          top3Country, 
          bottom3Country, 
          topLikelihoodCountry, 
          topRelevanceCountry,
          topIntensityCountry,
          countryCount,
         
        });




      }

      catch(err) {
        res.status(404).send("No route found");
      }
    }
)


//Region

productRouter.get(
  '/region',
  async (req, res) => {

    try {

      const top3Region = await Product.aggregate([

        {
          $group: 
          { 
            _id: {region: "$region"},
             myCount: { $sum: 1 } 
          }
        },

        {
          $sort: {myCount: -1}
        },

        {
          $limit: 3
        }


      ]);




      const bottom3Region = await Product.aggregate([

        {
          $group: 
          { 
            _id: {region: "$region"},
             myCount: { $sum: 1 } 
          }
        },

        {
          $sort: {myCount: 1}
        },

        {
          $limit: 3
        }


      ]);



      const topLikelihoodRegion = await Product.aggregate([

        { 
          $match : 
          { 
            likelihood : {$gte: 4}
          } 
        },

        {
          $group: 
          { 
            _id: {region: "$region"},
            myCount: { $sum: 1 } 
          }
        },

        {
          $sort: {myCount: -1}
        },

        {
          $limit: 5
        }

       

      ]);



      const topRelevanceRegion = await Product.aggregate([

        { 
          $match : 
          { 
            relevance : { $gte: 6 }
          } 
        },

        {
          $group: 
          { 
            _id: {region: "$region"},
            myCount: { $sum: 1 } 
          }
        },

        {
          $sort: {myCount: -1}
        },
       

      ]);



      const topIntensityRegion = await Product.aggregate([

        { 
          $match : 
          { 
            intensity : { $gte: 16 }
          } 
        },

        {
          $group: 
          { 
            _id: {region: "$region"},
            myCount: { $sum: 1 } 
          }
        },

        {
          $sort: {myCount: -1}
        },

        {
          $limit: 5
        }
       

      ]);


      const regionCount = await Product.aggregate([

        { 
          $group: 
          { 
            _id: {region: "$region"}, 
            count: { $sum: 1 } 
          } 
        },

      ]);


      res.send({
        top3Region,
        bottom3Region, 
        topLikelihoodRegion, 
        topRelevanceRegion, 
        topIntensityRegion,
        regionCount
      });




    }

    catch(err) {
      res.status(404).send("No route found");
    }
  }
)



//Topic

productRouter.get(
  '/topic',
  async (req, res) => {

    try {

      const top3Topic = await Product.aggregate([

        {
          $group: 
          { 
            _id: {topic: "$topic"},
             myCount: { $sum: 1 } 
          }
        },

        {
          $sort: {myCount: -1}
        },

        {
          $limit: 3
        }


      ]);



      const bottom3Topic = await Product.aggregate([

        {
          $group: 
          { 
            _id: {topic: "$topic"},
             myCount: { $sum: 1 } 
          }
        },

        {
          $sort: {myCount: 1}
        },

        {
          $limit: 3
        }


      ]);



      const topLikelihoodTopic = await Product.aggregate([

        { 
          $match : 
          { 
            likelihood : {$gte: 4}
          } 
        },

        {
          $group: 
          { 
            _id: {topic: "$topic"},
            myCount: { $sum: 1 } 
          }
        },

        {
          $sort: {myCount: -1}
        },

        {
          $limit: 5
        }

       

      ]);



      const topRelevanceTopic = await Product.aggregate([

        { 
          $match : 
          { 
            relevance : { $gte: 6 }
          } 
        },

        {
          $group: 
          { 
            _id: {topic: "$topic"},
            myCount: { $sum: 1 } 
          }
        },

        {
          $sort: {myCount: -1}
        },
       

      ]);



      const topIntensityTopic = await Product.aggregate([

        { 
          $match : 
          { 
            intensity : { $gte: 16 }
          } 
        },

        {
          $group: 
          { 
            _id: {topic: "$topic"},
            myCount: { $sum: 1 } 
          }
        },

        {
          $sort: {myCount: -1}
        },

        {
          $limit: 5
        }
       

      ]);


      const topicCount = await Product.aggregate([

        { 
          $group: 
          { 
            _id: {topic: "$topic"}, 
            count: { $sum: 1 } 
          } 
        },

      ]);




      res.send({
        top3Topic,
        bottom3Topic, 
        topLikelihoodTopic, 
        topRelevanceTopic, 
        topIntensityTopic,
        topicCount
      });




    }

    catch(err) {
      res.status(404).send("No route found");
    }
  }
)






export default productRouter;
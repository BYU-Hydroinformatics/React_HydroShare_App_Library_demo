import './App.css';
import React from "react";

import {DynamicTable} from "./DynamicTable.js";

const backendUrl= "http://localhost:4000/auth/hydroshare"

function getHydroShareUser(){
    const url = "https://www.hydroshare.org/hsapi/user/";
    fetch(url)
        .then (function (response){
            if(response.ok){
                return(response.json())
            }
            throw new Error("User Not Obtained from HydroShare")
        })
        .then (function (data){
            //console.log(data)
            if(typeof data.id !== 'undefined'){
                return data.id;
            }
            else{
                return "";
            }
        })
}


function HydroShareLogin() {

    return(
        <form action={backendUrl}>
            <button type="submit" className="login-button">
                <span className="button-text"> Sign in with HydroShare</span>
            </button>
        </form>
    );
}


function App() {

    return (
        <div>
            <HydroShareLogin />
            <DynamicTable user="David Tarboton"/>
        </div>
    );
}

export default App;

/*entries={
                           [
             {
                 'resource_title': 'City Water Model',
                 'creator': 'Hart Henrichsen',
                 'creator_url': '/user/1001',
                 'resource_url': 'https://www.hydroshare.org/resource/b2697235ef6746d3963775399f092c4f/',
                 'abstract': 'This is some code I made over the weekend. It is not done yet, but will be really cool.',
                 'short_id': 'd8e7873da67e4d8e89d94e314585f6bc',
                 'isCommunityApp': false,
                 'app_home_page_url': {'value':'http://temp'},
                 'url_base_aggregation': {'value':'http://hyrax.hydroshare.org/opendap/${HS_RES_ID}/data/contents/${HS_FILE_PATH}.html'},
                 'app_icon':{'value': ""},
                 'source_code_url' :'https://google.com',
             },
             {
                 'resource_title': 'HydroShare Pangeo',
                 'short_id': 'ed9ede792fc74856ba77aebf9443981f',
                 'resource_url': 'https://www.hydroshare.org/resource/ed9ede792fc74856ba77aebf9443981f/',
                 'isCommunityApp': false,
                 'creator': 'Bart Nijssen',
                 'creator_url': '/user/1005',
                 'url_base_aggregation': {'value':'http://hydro.pangeo.io'},
                 'abstract': 'The HydroShare Web App provides easy access to a containerized version of SUMMA as part of the NSF-funded Pangeo project. Pangeo uses docker images that contain SUMMA and pysumma and that allow SUMMA to be run from within Jupyter notebooks. The Pangeo instance enables SUMMA to be used in commercial cloud environments as well as for graduate education. [ Link to snow modeling course taught by Dr. Jessica Lundquist at the University of Washington as part of CUAHSI’s Virtual University in (Fall 2018; Fall 2019: Snow Hydrology and Modeling). Link to graduate course taught by Bart Nijssen at the University of Washington in Spring 2019 (CEWA 564 Advanced Hydrology).]\n' +
                     '\n',
                 'keywords': 'pysumma, summa, pangeo, jupyterhub, cloud computing',
                 'app_home_page_url': {'value':'http://hydro.pangeo.io'},
                 'version': null,
                 'views': 939,
                 'date_created': 'Sep 21, 2018 at 9:27 p.m.',
                 'date_last_updated': 'Dec 05, 2019 at 4:47 a.m.',
                 'supported_resource_types_string': 'Generic, Composite Resource',
                 'aggregationTypes': null,
                 'supported_file_extensions': null,
                 'help_page_url': null,
                 'mailing_list_url': null,
                 'issues_page_url': null,
                 'rights': 'Nijssen, B., C. Bandaragoda (2019). HydroShare Pangeo, HydroShare, http://www.hydroshare.org/resource/ed9ede792fc74856ba77aebf9443981f',
                 'app_icon': {'value': 'https://avatars1.githubusercontent.com/u/23299451?s=200&v=4'}
             },
             {
                 'resource_title': 'Data Rods Explorer',
                 'resource_url': 'https://www.hydroshare.org/resource/9e860803f84940358a4dd0e563a96572/',
                 'isCommunityApp': false,
                 'creator': 'Zhiyu/Drew Li',
                 'creator_url': '/user/3',
                 'url_base_aggregation': null,
                 'abstract': 'The Data Rods Explorer (DRE) is a web client app that enables users to browse several NASA-hosted data sets. The interface enables visualization and download of NASA observation retrievals and land surface model (LSM) outputs by variable, space and time. The key variables are precipitation, wind, temperature, surface downward radiation flux, heat flux, humidity, soil moisture, groundwater, runoff, and evapotranspiration. These variables describe the main components of the water cycle over land masses.\n' +
                     '\n',
                 'keywords': 'LSM, Land Surface Model, NASA',
                 'app_home_page_url': {'value': 'https://apps.hydroshare.org/apps/data-rods-explorer/'},
                 'version': null,
                 'views': 1183,
                 'date_created': 'Dec 07, 2017 at 3:38 p.m.',
                 'date_last_updated': 'Dec 07, 2017 at 3:46 p.m.',
                 'supported_resource_types_string': null,
                 'aggregationTypes': null,
                 'supported_file_extensions': null,
                 'help_page_url': null,
                 'mailing_list_url': null,
                 'issues_page_url': null,
                 'rights': 'Espinoza, G. E., D. Arctur, UT Austin (2017). Data Rods Explorer App, HydroShare, http://www.hydroshare.org/resource/9e860803f84940358a4dd0e563a96572',
                 'app_icon': {'value':"https://apps.hydroshare.org/static/data_rods_explorer/images/DataRodsExplorer_icon.png"}
             },
             {
                 'resource_title': 'OPeNDAP (Hyrax)',
                 'resource_url': 'https://www.hydroshare.org/resource/f5c46b72d49b4019972716a82355f7bd/',
                 'isCommunityApp': true,
                 'creator': 'David Tarboton',
                 'creator_url': '/user/13',
                 'url_base_aggregation':{'value': 'http://hyrax.hydroshare.org/opendap/${HS_RES_ID}/data/contents/'},
                 'abstract': 'This is the web app connector for the OPeNDAP service for content aggregations within Composite resources in HydroShare. The OPeNDAP service is available only for the "Public" composite resources. Due to current Hyrax deployment limitations this does not work for large NetCDF files. Exact upper limit unknown, but has been tested up to 200 MB successfully.',
                 'keywords': 'OPeNDAP, Multidimensional Space-time Data, NetCDF',
                 'app_home_page_url':{'value': 'http://hyrax.hydroshare.org/opendap/hyrax'},
                 'version': null,
                 'views': 2121,
                 'date_created': 'Feb 27, 2018 at 6:40 p.m.',
                 'date_last_updated': 'Apr 07, 2021 at 6:24 p.m.',
                 'supported_resource_types_string': 'Composite Resource',
                 'aggregationTypes': 'Multidimensional Content: A multidimensional dataset represented by a NetCDF file (.nc) and text file giving its NetCDF header content',
                 'supported_file_extensions':{'value': '.nc'},
                 'help_page_url': null,
                 'mailing_list_url': null,
                 'issues_page_url': null,
                 'rights': 'Tarboton, D. (2021). OPeNDAP (Hyrax), HydroShare, http://www.hydroshare.org/resource/f5c46b72d49b4019972716a82355f7bd',
                 'app_icon': {'value': 'https://pbs.twimg.com/profile_images/1003722775058702336/t8-nftfg_400x400.jpg'}
             },
             {
                 'resource_title': 'GRACE Data Viewer',
                 'resource_url': 'https://www.hydroshare.org/resource/7bccb6b1ffac46e389802e90d4fa2c42/',
                 'isCommunityApp': false,
                 'creator': 'Norm Jones',
                 'creator_url': '/user/1001',
                 'url_base_aggregation': {'value': 'https://tethys.byu.edu/apps/newgrace/'},
                 'abstract': 'Since 2002, NASA’s GRACE Satellite mission has allowed scientists of various disciplines to analyze and map the changes in Earth’s total water storage on a global scale. Although the raw data is available to the public, the process of viewing, manipulating, and analyzing the GRACE data can be tedious and difficult for those without strong technological backgrounds in programming or other related fields. The GRACE web app helps bridge the technical gap for decision makers by providing a user interface to visualize (in both map and time series format), not only the data collected from the GRACE mission, but the individual components of water storage as well. Using the GLDAS Land Surface model, the application allows the user to isolate and identify the changes in surface water and groundwater storage that makeup the total water storage quantities measured by the raw GRACE data. The application also includes the capability to upload a custom shapefile in order to perform a regional analysis of these changes allowing decision makers to aggregate and analyze the change in groundwater, surface water, and total water storage within their own personal regions of interest',
                 'keywords': 'NASA, GRACE, Groundwater',
                 'app_home_page_url':{'value': 'https://tethys.byu.edu/apps/newgrace/'},
                 'version': {'value':'2.0'},
                 'views': 801,
                 'date_created': 'Aug 02, 2018 at 7:50 p.m.',
                 'date_last_updated': 'Aug 15, 2018 at 8:56 p.m.',
                 'supported_resource_types_string': null,
                 'aggregationTypes': null,
                 'supported_file_extensions': null,
                 'help_page_url': null,
                 'mailing_list_url': null,
                 'issues_page_url': null,
                 'rights': 'McStraw, T. C., S. Pulla, S. Evans, N. Jones, D. Ames, J. Nelson (2018). GRACE Data Viewer, HydroShare, http://www.hydroshare.org/resource/7bccb6b1ffac46e389802e90d4fa2c42',
                 'app_icon': {'value': "https://www.hydroshare.org/resource/7da3501f2de2461b9a8c4e593400d019/data/contents/nbviewer.JPG"
                       }
             },
             {
                 'resource_title': 'SWATShare',
                 'resource_url': 'https://www.hydroshare.org/resource/3fb11de2432e46aaacd70499fd680e6d/',
                 'isCommunityApp': false,
                 'creator': 'I Luk Kim',
                 'creator_url': '/user/1001',
                 'url_base_aggregation': {'value':'https://mygeohub.org/groups/water-hub/swatshare?source=hs&res_id=${HS_RES_ID}'},
                 'abstract': 'SWATShare Web App for exploring HydroShare resource',
                 'keywords': 'SWATShare',
                 'app_home_page_url': {'value': 'https://mygeohub.org/groups/water-hub/swatshare_landing'},
                 'version': null,
                 'views': 1168,
                 'date_created': 'Apr 14, 2016 at 3:03 a.m.',
                 'date_last_updated': 'Apr 17, 2020 at 4:16 p.m.',
                 'supported_resource_types_string': 'SWAT Model Instance Resource',
                 'aggregationTypes': null,
                 'supported_file_extensions': null,
                 'help_page_url': null,
                 'mailing_list_url': null,
                 'issues_page_url': null,
                 'rights': 'Kim, I. L. (2020). SWATShare, HydroShare, http://www.hydroshare.org/resource/3fb11de2432e46aaacd70499fd680e6d',
                 'app_icon': {'value':"https://mygeohub.org/groups/water-hub/File:1449835642_magnifier.png" }
             },
             {
                 'resource_title': 'CJW-k8s-test-js-169-80',
                 'resource_url': 'https://www.hydroshare.org/resource/a0f43586759e462e9956a2e0361fc887/',
                 'isCommunityApp': false,
                 'creator': 'Zhiyu (Drew) Li',
                 'creator_url': '/user/1001',
                 'url_base_aggregation':{'value': 'http://js-169-80.jetstream-cloud.org/hub/spawn?next=/user-redirect/hs-pull?id=${HS_RES_ID}%26subfolder%3DDownloads'},
                 'abstract': 'CJW K8s test\n' +
                     'http://js-169-80.jetstream-cloud.org/',
                 'keywords': 'k8s, cjw',
                 'app_home_page_url': {'value': 'http://js-169-80.jetstream-cloud.org'},
                 'version': null,
                 'views': 57,
                 'date_created': 'Feb 13, 2021 at 5:33 p.m.\n',
                 'date_last_updated': 'Mar 09, 2021 at 11:01 p.m.',
                 'supported_resource_types_string': null,
                 'aggregationTypes': null,
                 'supported_file_extensions': {'value':'.ipynb'},
                 'help_page_url': null,
                 'mailing_list_url': null,
                 'issues_page_url': null,
                 'rights': 'Li, Z. (. (2021). CJW-k8s-test-js-169-80, HydroShare, http://www.hydroshare.org/resource/a0f43586759e462e9956a2e0361fc887',
                 'app_icon': {'value':""}
             },
             {
                 'resource_title': 'THREDDS',
                 'resource_url': 'https://www.hydroshare.org/resource/70070fa1b382496e85ca44894683b15d/',
                 'isCommunityApp': true,
                 'creator': 'Anthony M. Castronova',
                 'creator_url': '/user/1001',
                 'url_base_aggregation':{'value': 'https://thredds.hydroshare.org/thredds/catalog/hydroshare/resources/${HS_RES_ID}/data/contents/catalog.html'},
                 'abstract': 'This is the web app connector for the HydroShare THREDDS (Thematic Real-time Environmental Distributed Data Services) server for content aggregations within Composite resources in HydroShare. The THREDDS service is available only for the "Public" composite resources. This THREDDS server supports access to netCDF data through OPeNDAP using the DAP2 protcol. This connects to a CUAHSI deployment of the UCAR Unidata THREDDS server https://www.unidata.ucar.edu/software/tds/current/TDS.html.',
                 'keywords': 'Multidimensional Space-time Data, THREDDS, NetCDF, OPeNDAP',
                 'app_home_page_url': {'value': 'http://thredds.hydroshare.org'},
                 'version': null,
                 'views': 68,
                 'date_created': 'Mar 31, 2021 at 2:31 p.m.',
                 'date_last_updated': 'Apr 09, 2021 at 11:28 p.m.',
                 'supported_resource_types_string': 'Composite Resource',
                 'aggregationTypes': 'Multidimensional Content: A multidimensional dataset represented by a NetCDF file (.nc) and text file giving its NetCDF header content',
                 'supported_file_extensions': {'value':'.nc'},
                 'help_page_url': null,
                 'mailing_list_url': null,
                 'issues_page_url': null,
                 'rights': 'Tarboton, D., C. Calloway (2021). THREDDS, HydroShare, http://www.hydroshare.org/resource/70070fa1b382496e85ca44894683b15d',
                 'app_icon': {'value':"https://unidata.ucar.edu/images/logos/badges/badge_tds_100.jpg"}
             },
             {
                 'resource_title': 'CyberGIS-Jupyter for Water',
                 'resource_url': 'https://www.hydroshare.org/resource/4cfd280e8eb747169b293aec2862d4f5/',
                 'isCommunityApp': true,
                 'creator_url': '/user/1001',
                 'creator': 'Shaowen Wang ',
                 'url_base_aggregation': {'value':'https://go.illinois.edu/cybergis-jupyter-water/hub/spawn?next=/user-redirect/hs-pull?id=${HS_RES_ID}%26subfolder%3DDownloads'},
                 'abstract': 'The CyberGIS-Jupyter for Water (CJW) platform aims to advance community hydrologic modelling, and support data-intensive, reproducible, and computationally scalable water science research by simplifying access to advanced cyberGIS and cyberinfrastructure capabilities through a friendly Jupyter Notebook environment. The current release has specific support for the Structure For Unifying Multiple Modeling Alternatives (SUMMA) model and the WRFHydro model.\n' +
                     '\n' +
                     'You may open and view any notebook (*.ipynb file) with this app.\n' +
                     '\n' +
                     'Please send comments and bug reports to help@cybergis.org.',
                 'keywords': 'jupyter, cybergis, alpha, water\n',
                 'app_home_page_url': {'value':'https://go.illinois.edu/cybergis-jupyter-water/'},
                 'version': {'value':'beta'},
                 'views': 1056,
                 'date_created': 'Oct 21, 2019 at 1:19 p.m.',
                 'date_last_updated': 'Feb 17, 2021 at 8:20 p.m.',
                 'supported_resource_types_string': 'Geographic Feature (ESRI Shapefiles), Geographic Raster, Generic, Multidimensional (NetCDF), SWAT Model Instance Resource, HIS Referenced Time Series, Time Series, Script Resource, Model Program Resource, Model Instance Resource, Collection Resource, MODFLOW Model Instance Resource, Composite Resource',
                 'aggregationTypes': 'Multidimensional Content: A multidimensional dataset represented by a NetCDF file (.nc) and text file giving its NetCDF header content, Referenced Time Series Content: A reference to one or more time series served from HydroServers outside of HydroShare in WaterML format, Time Series Content: One or more time series held in an ODM2 format SQLite file and optional source comma separated (.csv) files, Single File Content: A single file with file specific metadata, Geographic Raster Content: A geographic grid represented by a virtual raster tile (.vrt) file and one or more geotiff (.tif) files, Geographic Feature Content: The multiple files that are part of a geographic shapefile, File Set Content: One or more files with specific metadata',
                 'supported_file_extensions': {'value':'.ipynb'},
                 'help_page_url': "https://github.com",
                 'mailing_list_url': "https://gmail.com",
                 'issues_page_url': "https://help.com",
                 'rights': 'Li, Z. (., F. Lu, A. Padmanabhan, S. Wang (2021). CyberGIS-Jupyter for Water, HydroShare, http://www.hydroshare.org/resource/4cfd280e8eb747169b293aec2862d4f5',
                 'app_icon': {'value':'https://pbs.twimg.com/profile_images/1003722775058702336/t8-nftfg_400x400.jpg'}
             }

         ]
                       }
                       */
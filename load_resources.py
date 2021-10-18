from hs_restclient import HydroShare, HydroShareAuthBasic
import urllib.request
import json
import time


def load_resources(user, userpass,max_inputs=0):
    startingTime = time.time()
    return_resources=[]

    auth = HydroShareAuthBasic(username=user, password=userpass)
    hs = HydroShare(auth=auth)
    hs_resources= hs.resources(types=["ToolResource"])
    resourceList=[]
    for resource in hs_resources:
        resourceList.append(resource)
    resourceListLength=len(resourceList)
    for resource in resourceList:
            name=''
            owner=''
            authors=''
            abstract=''
            short_id=''
            appLaunchingResourceUrlPattern=''
            keywords=''
            homeUrl=''
            fileUrl=''
            aggregationUrl=''
            connectorUrl=''
            sourceCodeUrl=''
            helpUrl=''
            mailUrl=''
            issueUrl=''
            ownerUrl=''
            version=''
            dateCreated=''
            lastUpdateDate=''
            resourceTypes=''
            aggregationTypes=''
            fileExtensions=''
            relations=''
            fundingAgencies=''
            sources=''
            copyright=''
            isCommunityApp=False
            icon=''


            resource_dublin=hs.getScienceMetadata(resource["resource_id"])
            name=resource_dublin['title']
            print("Title: "+resource_dublin['title'])
            if (resource_dublin['app_icon']):
                icon=resource_dublin['app_icon']
            for creator in resource_dublin["creators"]:
                authors+=creator["name"]+", "
                if creator['order'] == 1:
                    owner+=creator['name']
                    ownerUrl+=creator['description']
            authors=authors[0:len(authors)-2]

            if(resource_dublin['description']):
                abstract=resource_dublin['description']

            for word in resource_dublin['subjects']:
                keywords+=word['value']+", "
            keywords= keywords[0:len(keywords)-2]

            if(resource_dublin['version']):
                version=resource_dublin['version']['value']
            else:
                version="none"

            for date in resource_dublin['dates']:
                if(date['type']=='created'):
                    dateCreated=date['start_date']
                elif date['type']=='modified':
                    lastUpdateDate=date['start_date']

            if (resource_dublin['supported_aggregation_types'] and resource_dublin['supported_aggregation_types']['supported_agg_types']):
                for r in resource_dublin['supported_aggregation_types']['supported_agg_types']:
                    aggregationTypes=aggregationTypes+(r['description'])+", "
                aggregationTypes=(aggregationTypes[0:len(aggregationTypes)-2])
            else:
                aggregationTypes="None"

            if(resource_dublin['supported_resource_types']):
                for r in resource_dublin['supported_resource_types']['supported_res_types']:
                    resourceTypes+=r['description']+", "
                resourceTypes=(resourceTypes[0:len(resourceTypes)-2])
            else:
                resourceTypes="None"

            if (resource_dublin['app_home_page_url'] and resource_dublin['app_home_page_url']['value']):
                homeUrl=resource_dublin['app_home_page_url']['value']
            else:
                homeUrl="None"
            if(resource_dublin['url_base']):
                appLaunchingResourceUrlPattern=resource_dublin['url_base']['value']
            else:
                appLaunchingResourceUrlPattern="None"
            if(resource_dublin['url_base_file']):
                fileUrl=resource_dublin['url_base_file']['value']
            else:
                fileUrl="None"
            if(resource_dublin['url_base_aggregation']):
                aggregationUrl=resource_dublin['url_base_aggregation']['value']
            else:
                aggregationUrl="None"
            connectorUrl= resource_dublin['identifiers'][0]['url']

            if(resource_dublin['source_code_url']):
                sourceCodeUrl=resource_dublin['source_code_url']['value']
            else:
                sourceCodeUrl="None"
            if(resource_dublin['help_page_url']):
                helpUrl=resource_dublin['help_page_url']['value']
            else:
                helpUrl="None"

            if(resource_dublin['mailing_list_url']):
                mailUrl=resource_dublin['mailing_list_url']['value']
            else:
                mailUrl="None"
            if(resource_dublin['issues_page_url']):
                helpUrl=resource_dublin['issues_page_url']['value']
            else:
                helpUrl="None"
            if(resource_dublin['relations']!=[]):
                for r in resource_dublin['relations']:
                    relations=r['type']+" "+r['value']+", "
                relations=(relations[0:len(relations)-2])
            else:
                relations="None"
            if resource_dublin['funding_agencies']:
                for s in resource_dublin['funding_agencies']:
                    fundingAgencies+=s['agency_name']+", "
                fundingAgencies=(fundingAgencies[0:len(fundingAgencies)-2])
            else:
                fundingAgencies="None"
            if resource_dublin['sources']:
                for s in resource_dublin['sources']:
                    fundingAgencies+=s['derived_from']+", "
                fundingAgencies=(fundingAgencies[0:len(fundingAgencies)-2])
            else:
                fundingAgencies="None"
            copyright=resource_dublin['rights']

            current_resource={
                'name':name,
                'owner':owner,
                'authors':authors,
                'abstract':abstract,
                'short_id':short_id,
                'appLaunchingResourceUrlPattern':appLaunchingResourceUrlPattern,
                'keywords':keywords,
                'homeUrl':homeUrl,
                'fileUrl':fileUrl,
                'aggregationUrl':aggregationUrl,
                'connectorUrl':connectorUrl,
                'sourceCodeUrl':sourceCodeUrl,
                'helpUrl':helpUrl,
                'mailUrl':mailUrl,
                'issueUrl':issueUrl,
                'ownerUrl':ownerUrl,
                'version':version,
                'dateCreated':dateCreated,
                'lastUpdateDate':lastUpdateDate,
                'supportedResourceTypes':resourceTypes,
                'aggregationTypes':aggregationTypes,
                'fileExtensions':fileExtensions,
                'relations':relations,
                'agencies':fundingAgencies,
                'sources':sources,
                'copyright':copyright,
                'isCommunityApp':isCommunityApp,
                'icon':icon,
                }
            return_resources.append(current_resource)
            # end for
    elapsedTime = time.time() - startingTime
    print("It took "+str(elapsedTime)+" seconds to run this function")
    if len(return_resources) != resourceListLength:
        print('There is an issue where not all resources have been mapped correctly')

    if max_inputs!=0:
        return return_resources[0:max_inputs]
    return return_resources
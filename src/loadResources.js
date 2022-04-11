export async function loadResources() {
    /**
     *  This function authenticates the user with HydroShare and then loads all web app connectors the user has access to.
     */
    const getResourcesUrl = "https://www.hydroshare.org/hsapi/resource/?edit_permission=false&published=false&type=ToolResource&include_obsolete=false";
    return await fetch(getResourcesUrl)
        .then(function (response) {
            if (response.ok) {
                return (response.json());
            }
            throw new Error("Network response was not okay.");
        })
        .then(function (data) {
            return addDublin(data.results);
        })

}

async function addDublin(sciMetadata) {
    return Promise.all(sciMetadata.map((resource) => {
        let resourceId = resource.resource_id;
        const url = "https://www.hydroshare.org/hsapi/resource/" + resourceId + "/scimeta/elements/";
        return fetch(url)
            .then(function (response) {
                if (response.ok)
                    return (response.json())
                throw new Error("There was an error loading the Dublin metadata for " + resourceId);
            })
            .then(function (data) {
                let fullResource = Object.assign({}, resource, data);
                return (fullResource);
            });

    }))
        .then(async (data) => {

            return processMetadata(data);
        });
}

function processMetadata(fullMetadata) {
    fullMetadata.forEach(resource => {
        resource.creators.forEach(creator => {
            if (resource.creator === creator.name) {
                resource.creator_url = creator.description;
            }
        });

        let concat = "";
        resource.subjects.forEach(subject => {
            concat += subject.value + ", ";
        });
        resource.keywords = concat.slice(0, -2)

        concat = "";
        resource?.supported_resource_types?.supported_res_types.forEach(res_type => {
            concat += res_type.description + ", ";
        });
        resource.supported_resource_types_string = concat.slice(0, -2)

        concat = "";
        resource?.supported_aggregation_types?.supported_agg_types.forEach(agg_type => {
            concat += agg_type.description + ", ";
        });
        resource.supported_aggregation_types_string = concat.slice(0, -2);


    });
    return (fullMetadata)
}
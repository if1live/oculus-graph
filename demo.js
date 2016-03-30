var OculusGraph = require('./index');

/*
  authKey : 'Bearer xxxxxx'
*/
var authKey = process.env.OCULUS_AUTH_KEY;
if(typeof(authKey) === 'undefined') {
  console.log('Use Environment variable, OCULUS_AUTH_KEY');
  process.exit();
}

var oculusGraph = new OculusGraph(authKey);

// get sections
oculusGraph.requestSections(function(data, statusCode, headers) {
  console.log('# sections');
  console.log(JSON.stringify(data, null, 2));

  // get "Concepts" section's list
  var sections = data.viewer.app_store.sections.nodes;
  for(var i = 0 ; i < sections.length ; i++) {
    if(sections[i].section_name === 'Concepts') {
      var sectionId = sections[i].id;
      var graphql = `node(<category>) {
        section_name,
        items.after(<cursor>).first(<count>) {
          nodes {
            id,
            display_name,
          },
          page_info {
            start_cursor,
            end_cursor,
            has_next_page,
          },
        }
      }`;
      oculusGraph.requestGraphQL(graphql, {
        count: 10,
        category: sectionId,
        // cursor: use it if access next page
      }, function(data, statusCode, headers) {
        console.log('# Concept section')
        console.log(JSON.stringify(data, null, 2));

        // get first game's information
        var applicationId = data[sectionId].items.nodes[0].id;
        var graphql = `node(<id>) {
          id,
          display_name,
          display_short_description,
          is_gamepad_required,
          current_offer {
            id,
            price {
              offset_amount,
              formatted,
            },
          },
        }`;
        oculusGraph.requestGraphQL(graphql, {
          id: applicationId
        }, function(data, statusCode, headers) {
          console.log('# Game information');
          console.log(JSON.stringify(data, null, 2));
        });
      });
    }
  }
});

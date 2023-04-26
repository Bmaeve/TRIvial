import { reactive } from 'vue'
//the different constants that need to be shared with other files
export const store = reactive({
    featureInfo: [{}],
    params: {},
    num_scenario: "",
    prob_scenario: 0,
    itineraire: [],
    displayIti: false

})

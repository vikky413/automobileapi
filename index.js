import {group,sleep} from 'k6'
import Batteris from './batteries.js'
import Break from './break.js'
import Light from './light.js'
import Search from './search.js'
import Tires from './tires.js'


// This is use  only for ceate html Report 

export const options = {
    
  // duration:duration,
  stages: [
    { duration: "20s", target: 10 },
    { duration: "20s", target: 10 },
    { duration: "20s", target: 10 },
    { duration: "20s", target: 10 },
  ],

  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<300'], // 95% of requests should be below 200ms
  },
  
  ext: {
    loadimpact: {
      projectID: 3626852,
      // Test runs with the same name groups test runs together
      name: "automobile Api"
    }
  },

}

export default ()=> {

    group(" Batteries Page Transaction ", ()=> {
        Batteris()
    })
 
    group(" Break page transaction ",()=> {
       Break()
    })

    group(" Light Page transaction ",()=> {
       Light()
    })
  
   group(" Search Page transaction ",()=> {
      Search()
   })

    group("Tires Page transaction ",()=> {
        Tires()
    })
    sleep(1)
}
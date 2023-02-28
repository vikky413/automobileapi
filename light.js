import { sleep, group,check } from 'k6'
import http from 'k6/http'
import { homeurl } from './env.js'

export const options = {
  vus: 10,
  duration: "30s",
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
  
  ext: {
    loadimpact: {
      projectID: 3626852,
      // Test runs with the same name groups test runs together
      name: "light automobile Api"
    }
  },

}


export default function main() {
  let response

  group('page_1 - home page', function () {
    response = http.get(homeurl, {
      headers: {
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    check(response,{
      "Home Page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })


  group('page_2 - Lighting page transaction', function () {
    response = http.get(`${homeurl}Store/Browse?CategoryId=2`, {
      headers: {
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    check(response,{
      "Lighting Page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })



  group('page_3 - Bugeye Headlights details transaction', function () {
    response = http.get(`${homeurl}Store/Details/2`, {
      headers: {
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    response = http.get(`${homeurl}Recommendations/GetRecommendations?productId=2`, {
      headers: {
        accept: '*/*',
        'x-requested-with': 'XMLHttpRequest',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    check(response,{
      "Details Page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })



  group('page_4 - Bugeye Headlights add to cart transaction', function () {
    response = http.get(`${homeurl}ShoppingCart/AddToCart/2`, {
      headers: {
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    check(response,{
      "add to cart Page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
    
  })
}
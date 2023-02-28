import http from 'k6/http'
import { sleep, group,check } from 'k6'

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
      name: "battery automobile Api"
    }
  },

}


export default function main() {
  let response

  group('Home Page transaction', function () {
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
      "Home Page status": (r)=> r.status === 200,
    })
    sleep(1)
  })



  group('move to the Batteries transaction', function () {
    response = http.get(`${homeurl}Store/Browse?CategoryId=4`, {
      headers: {
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    check(response,{
      "Batteries page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })




  group('page_3 - choose 12-Volt Calcium Battery ', function () {
    response = http.get(`${homeurl}Store/Details/13`, {
      headers: {
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    response = http.get(`${homeurl}Recommendations/GetRecommendations?productId=13`, {
      headers: {
        accept: '*/*',
        'x-requested-with': 'XMLHttpRequest',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    check(response,{
      "12-Volt Calcium Battery details page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })

  group('page_4 - Select 12-Volt Calcium Battery add to cart transaction', function () {
    response = http.get(`${homeurl}ShoppingCart/AddToCart/13`, {
      headers: {
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    check(response,{
      "12-Volt Calcium Battery added cart status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })

  group('page_7 - Select Battery Jumper Leads transaction', function () {
    response = http.get(`${homeurl}Store/Details/15`, {
      headers: {
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    check(response,{
      "Battery Jumper Leads details page status is ok": (r)=> r.status === 200,
    })
    response = http.get(`${homeurl}Recommendations/GetRecommendations?productId=15`, {
      headers: {
        accept: '*/*',
        'x-requested-with': 'XMLHttpRequest',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    check(response,{
      "Jumper Leads details page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })

  group('page_9 - Spiral Coil batteries transaction', function () {
    response = http.get(`${homeurl}Store/Details/14`, {
      headers: {
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    check(response,{
      "Spiral Coil batteries page status is ok": (r)=> r.status === 200,
    })
    response = http.get(`${homeurl}Recommendations/GetRecommendations?productId=14`, {
      headers: {
        accept: '*/*',
        'x-requested-with': 'XMLHttpRequest',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    check(response,{
      "Spiral Coil batteries page details status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })

  group('page_10 - Spiral Coil batteries add to the cart transaction', function () {
    response = http.get(`${homeurl}ShoppingCart/AddToCart/14`, {
      headers: {
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    check(response,{
      "Spiral Coil batteries added successfully status is ok ": (r)=> r.status === 200,
    })
  })
}
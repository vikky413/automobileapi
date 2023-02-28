
import { sleep, group, check } from 'k6'
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
      name: "Search Operations Api"
    }
  },

}
// export const options = { vus: 10, duration: '5m' }

export default function main() {
  let response

  group('page_1 - Home Page', function () {
    response = http.get(homeurl, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    check(response,{
      "Home Page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })

  group('page_2 - search Halogen transaction', function () {
    response = http.get(`${homeurl}Search?q=Halogen`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    check(response,{
      "search  Page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })

  group('page_3 - Halogen Headlights details page transaction ', function () {
    response = http.get(`${homeurl}Store/Details/1`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    response = http.get(`${homeurl}Recommendations/GetRecommendations?productId=1`, {
      headers: {
        accept: '*/*',
        'x-requested-with': 'XMLHttpRequest',
      },
    })
    check(response,{
      "Halogen Headlights details psge status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })

  group('page_4 - Search matte transaction ', function () {
    response = http.get(`${homeurl}Search?q=matte`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    check(response,{
      "Search page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })

  group('page_5 - Matte Finish Rim details transaction', function () {
    response = http.get(`${homeurl}Store/Details/4`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    response = http.get(`${homeurl}Recommendations/GetRecommendations?productId=4`, {
      headers: {
        accept: '*/*',
        'x-requested-with': 'XMLHttpRequest',
      },
    })
    check(response,{
      "Matte Finish Rim details page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })

  group('page_7 - Search 12-Volt transaction', function () {
    response = http.get(`${homeurl}Search?q=12-Volt`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    check(response,{
      "Search page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })

  group('page_8 - 12-Volt Calcium Battery Details transaction', function () {
    response = http.get(`${homeurl}Store/Details/13`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    response = http.get(`${homeurl}Recommendations/GetRecommendations?productId=13`, {
      headers: {
        accept: '*/*',
        'x-requested-with': 'XMLHttpRequest',
      },
    })
    check(response,{
      "12-Volt Calcium Battery details page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })

  group('page_9 - 12-Volt Calcium Battery add to cart', function () {
    response = http.get(`${homeurl}ShoppingCart/AddToCart/13`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    check(response,{
      "12-Volt Calcium Battery add to cart page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })

  group('page_10 - Home Page', function () {
    response = http.get(homeurl, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    check(response,{
      "Home page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })

  group('page_11 - Search Disk transaction', function () {
    response = http.get(`${homeurl}Search?q=Disk`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    check(response,{
      "Search page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })

  group('page_12 - Disk and Pad Combo details transaction', function () {
    response = http.get(`${homeurl}Store/Details/10`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    response = http.get(`${homeurl}Recommendations/GetRecommendations?productId=10`, {
      headers: {
        accept: '*/*',
        'x-requested-with': 'XMLHttpRequest',
      },
    })
    check(response,{
      "Disk and Pad Combo details page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })

  group('page_14 - Brake Disk and Calipers details transaction', function () {
    response = http.get(`${homeurl}Store/Details/12`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    response = http.get(`${homeurl}Recommendations/GetRecommendations?productId=12`, {
      headers: {
        accept: '*/*',
        'x-requested-with': 'XMLHttpRequest',
      },
    })
    check(response,{
      "Brake Disk and Calipers details page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })


  group('page_29 - Home Page', function () {
    response = http.get(homeurl, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
  })
}
import { sleep, group,check } from 'k6'
import http from 'k6/http'
import { homeurl } from './env.js'
// export const options = { vus: 10, duration: '5m' }

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
      name: "tires automobile Api"
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

  group('page_2 - Wheels and tires transaction', function () {
    response = http.get(`${homeurl}Store/Browse?CategoryId=3`, {
      headers: {
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    check(response,{
      "Wheels & tires Page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })

  group('page_3 - Matte Finish Rim details transaction', function () {
    response = http.get(`${homeurl}Store/Details/4`, {
      headers: {
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    response = http.get(`${homeurl}Recommendations/GetRecommendations?productId=4`, {
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

  group('page_4 - Wheels & tires transaction', function () {
    response = http.get(`${homeurl}Store/Browse?CategoryId=3`, {
      headers: {
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    check(response,{
      "wheels & tires Page status is ok": (r)=> r.status === 200,
    })
    sleep(1)
  })

  group('page_5 -Wheel Tire Combo (4 Pack) details transaction', function () {
    response = http.get(`${homeurl}Store/Details/9`, {
      headers: {
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    response = http.get(`${homeurl}Recommendations/GetRecommendations?productId=9`, {
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

  group('page_6 - Wheel Tire Combo (4 Pack) add to cart transaction', function () {
    response = http.get(`${homeurl}ShoppingCart/AddToCart/9`, {
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
  })
}
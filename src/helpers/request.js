import axios from 'axios';

// API url

export const apiURL = process.env.NODE_ENV === 'production' ? 'http://3.15.215.240:8081' : 'http://127.0.0.1:8081';

// Request function

export const request = async ({
   baseUrl = apiURL,
   location = '/api',
   path,
   method = 'GET',
   headers,
   body
}) => {

   return await axios({
      url: `${baseUrl}${location}${path}`,
      method,
      headers,
      data: JSON.stringify(body)
   });
}
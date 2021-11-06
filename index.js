"use strict"

const axios = require("axios")

exports.getMyIngredients = (endpoint, cakeName) => {
  const url = endpoint.url
  const port = endpoint.port

  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: `/ingredients/${cakeName}`,
    headers: { Accept: "application/json" },
  })
}

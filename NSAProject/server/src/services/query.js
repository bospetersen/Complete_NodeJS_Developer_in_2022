const PAGE_LIMIT = process.env.DEFAULT_PAGE_LIMIT
const PAGE_NUMBER = process.env.DEFAULT_PAGE_NUMBER
console.log(PAGE_LIMIT, PAGE_NUMBER);

function getPagination(query) {
  const page = Math.abs(query.page) || PAGE_NUMBER;
  const limit = Math.abs(query.limit) || PAGE_LIMIT;
  const skip = (page-1) * limit

  return {
    skip,
    limit
  }
}

module.exports = {
  getPagination
}
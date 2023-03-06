const DEFAULT_PAGE_NUMBER = 1
const DEFAULT_PAGE_LIMIT = 0; // we want 0 as this returns ALL of the pages

function getPagination(query) {
    const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
    const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
    const skip = (page - 1) * limit
    // first page: (1-1) * 50 = 0 - we skip 0 
    // second page: (2-1) * 50 = 50. We skip the first 50 launches
    return {
        skip: skip,
        limit: limit,
    }
}

module.exports = {
    getPagination,
}
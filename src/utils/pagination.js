const getPaginationInfo = (page, limit, count) => {
    page = parseInt(page);
    const totalPages =  Math.ceil(count / limit)
    const previousPage =  page - 1 == 0 ? null : page - 1; 
    const nextPage = (totalPages == page || totalPages == 0) ? null : parseInt(page) + 1; 
    return {
        limit: +limit,
        totalCount: count,
        totalPages: totalPages,
        currentPage: page,
        nextPage: nextPage,
        previousPage: previousPage,
    };
};
module.exports = getPaginationInfo;
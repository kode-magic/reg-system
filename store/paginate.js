const paginate = (totalItems, currentPage, pageSize, maxPages = 5) => {
    const totalPages = Math.ceil(totalItems / pageSize);


    let startPage = currentPage - Math.floor(maxPages / 2);
    let endPage = (currentPage + Math.floor(maxPages / 2));

    if (startPage < 1) {
        startPage = 1;
        endPage = maxPages;
    }

    if (endPage > totalPages) {
        startPage = totalPages - (maxPages - 1);

        endPage = totalPages;

        if (startPage < 1) {
            startPage = 1;
        }
    }

    const pages = [];

    for (let page = startPage; page <= endPage; page++) {
        pages.push(page);
    }

    return {
        totalItems,
        currentPage: Number.parseInt(`${currentPage}`),
        pageSize: pageSize,
        totalPages,
        startPage,
        endPage,
        startIndex: totalPages > 0 ? (currentPage * pageSize) - pageSize : 0,
        endIndex: totalPages > 0 ? (currentPage * pageSize) : 0,
        pages
    }
}

export const paginateData = (items, page = 1, pageSize = 7) => {

    const pager = paginate(items.length, page, pageSize);

    const pageOfItems = items.slice(pager.startIndex, pager.endIndex);

    return { pager, pageOfItems }
}
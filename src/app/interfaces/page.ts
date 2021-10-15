export interface Page<T> {
    /** エンティティの配列 */
    content: T[];
    /** ページ情報 */
    pageable: Pageable;
    /** このページが最後のページであるか */
    last: boolean;
    /** sizeでページを分割した時の全ページ数 */
    totalPages: number;
    /** 検索のヒット数 */
    totalElements: number;
    /** 1ページ当たりのエンティティ数 */
    size: number;
    /** ページ番号 */
    number: number;
    /** ソート情報 */
    sort: Sort;
    /** このページが最初のページであるか */
    first: boolean;
    /** このページに含まれる要素数 */
    numberOfElements: number;
    /** 要素数がゼロであるか */
    empty: boolean;
}

export interface Sort {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
}

export interface Pageable {
    sort: Sort,
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
}
export interface IPagination<DateType> {
    per_page: number;
    total: number;
    current_page: number;
    total_pages: number;
    next_page: string | null;
    prev_page: string | null;
    data: DateType[];
}

export class FindManySkinsDto {
  startPrice?: number;
  endPrice?: number;
  float?: number;
  name?: string;
  order?: 'asc' | 'desc';
  category?: string;
}

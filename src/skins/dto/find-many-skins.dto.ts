export class FindManySkinsDto {
  startPrice?: number;
  endPrice?: number;
  float?: number;
  name?: string;
  order?: 'asc' | 'desc';
  orderBy?: 'name' | 'price' | 'float';
  category?: string;
}

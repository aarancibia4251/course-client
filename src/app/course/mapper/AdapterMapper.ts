export interface AdapterMapper<M, D, W> {
  mapperFromListWsToListModel(list: Array<W>): Array<M>;
  mapperFromListWsToListDb(list: Array<W>): Array<D>;

  mapperFromModelToDb(item: M): D;
  mapperFromDbToModel(item: D): M;
  mapperFromModelToWs(item: M): W;
  mapperFromWsToModel(item: W): M;
  mapperFromWsToDb(item: W): D;

  mapperFromListModelToListDb(list: Array<M>): Array<D>;
  mapperFromListDbToListModel(list: Array<D>): Array<M>;
}

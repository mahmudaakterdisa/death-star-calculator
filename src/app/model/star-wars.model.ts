import { EntityBase } from 'src/app/model/entity-base.mode';

export class StarWarsEntity<TEntity extends EntityBase> {
   public results: Array<TEntity> = [];
}

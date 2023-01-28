import Entity from '@core/Entity';
import StateEntity from './state';

interface CityProps {
  name: string;
  stateId: string;
  state?: StateEntity;
}

type UpdatableProps = Pick<CityProps, 'name'>;

export default class CityEntity extends Entity<CityProps> {
  name: string;

  stateId: string;

  state: StateEntity;

  update(props: Partial<UpdatableProps>): void {
    if (props.name) {
      this.name = props.name;
    }
  }
}

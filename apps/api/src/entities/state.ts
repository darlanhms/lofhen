import Entity from '@core/Entity';

interface StateProps {
  name: string;
  abbr: string;
}

export default class StateEntity extends Entity<StateProps> {
  name: string;

  abbr: string;
}

import Entity from '@core/Entity';
import getFirstLink from '@core/utils/string';
import CityEntity from './city';

interface AddressProps {
  alias: string;
  customerId: string | null;
  link: string | null;
  cityId: string;
  neighborhood: string | null;
  street: string | null;
  number: string | null;
  reference: string | null;
  complement: string | null;
  enabled?: boolean;
  city?: CityEntity;
}

type UpdatableProps = Pick<
  AddressProps,
  'alias' | 'link' | 'neighborhood' | 'street' | 'number' | 'reference' | 'complement' | 'enabled'
>;

export default class AddressEntity extends Entity<AddressProps> {
  alias: string;

  customerId: string | null;

  link: string | null;

  cityId: string;

  neighborhood: string | null;

  street: string | null;

  number: string | null;

  reference: string | null;

  complement: string | null;

  enabled: boolean;

  city: CityEntity;

  constructor(props: AddressProps, id?: string) {
    const propsWithDefault: AddressProps = {
      enabled: true,
      ...props,
    };

    super(propsWithDefault, id);
    this.normalize();
  }

  private normalize(): void {
    if (this.link) {
      this.link = getFirstLink(this.link) || '';
    }
  }

  update(props: Partial<UpdatableProps>): void {
    if (props.alias) {
      this.alias = props.alias;
    }
    if (props.link || props.link === null) {
      this.link = props.link;
    }
    if (props.neighborhood || props.neighborhood === null) {
      this.neighborhood = props.neighborhood;
    }
    if (props.street || props.street === null) {
      this.street = props.street;
    }
    if (props.number || props.number === null) {
      this.number = props.number;
    }
    if (props.reference || props.reference === null) {
      this.reference = props.reference;
    }
    if (props.complement || props.complement === null) {
      this.complement = props.complement;
    }
    if (props.enabled || props.enabled === false) {
      this.enabled = props.enabled;
    }

    this.normalize();
  }
}

import Entity from '@core/Entity';
import { isFilled } from '@core/utils/array';
import { onlyNumbers } from '@core/utils/string';
import AddressEntity from './address';

interface CustomerProps {
  name: string;
  birthdate: Date | null;
  phone: string | null;
  observation: string | null;
  createdBy: string;
  createdAt?: Date;
  enabled?: boolean;
  addresses: AddressEntity[];
}

type UpdateTableProps = Pick<CustomerProps, 'name' | 'birthdate' | 'phone' | 'observation' | 'enabled'>;

export default class CustomerEntity extends Entity<CustomerProps> {
  name: string;

  birthdate: Date | null;

  phone: string | null;

  observation: string | null;

  createdBy: string;

  enabled: boolean;

  createdAt: Date;

  addresses: AddressEntity[];

  private normalize(): void {
    if (this.birthdate) {
      this.birthdate = new Date(this.birthdate);
    }

    if (this.phone) {
      this.phone = onlyNumbers(this.phone);
    }

    if (isFilled(this.addresses)) {
      this.addresses.map(address => ({
        ...address,
        customerId: this.id,
      }));
    }
  }

  constructor(props: CustomerProps, id?: string) {
    const propsWithDefault: CustomerProps = {
      enabled: true,
      createdAt: new Date(),
      ...props,
    };

    super(propsWithDefault, id);
    this.normalize();
  }

  update(props: Partial<UpdateTableProps>): void {
    if (props.name) {
      this.name = props.name;
    }

    if (props.phone || props.phone === null) {
      this.phone = props.phone;
    }

    if (props.birthdate || props.birthdate === null) {
      this.birthdate = props.birthdate;
    }

    if (props.observation || props.observation === null) {
      this.observation = props.observation;
    }

    if (props.enabled || props.enabled === false) {
      this.enabled = props.enabled;
    }

    this.normalize();
  }
}

import { City as PrismaCity, State } from '@prisma/client';
import Mapper from '@core/Mapper';
import { CityDTO } from '@dtos/city';
import CityEntity from '@entities/city';
import StateMapper from './stateMapper';

interface City extends PrismaCity {
  state: State;
}

class CityMapperBase extends Mapper<CityEntity, PrismaCity, CityDTO> {
  toEntity(persisted: City): CityEntity {
    return new CityEntity(
      {
        name: persisted.name,
        stateId: persisted.stateId,
        state: StateMapper.toEntityOrUndefined(persisted.state),
      },
      persisted.id,
    );
  }

  toPersistence(entity: CityEntity): PrismaCity {
    return {
      id: entity.id,
      name: entity.name,
      stateId: entity.stateId,
    };
  }

  toDTO(entity: CityEntity): CityDTO {
    return {
      id: entity.id,
      name: entity.name,
      stateId: entity.stateId,
      state: StateMapper.toDTOOrUndefined(entity.state),
    };
  }
}

const CityMapper = new CityMapperBase();

export default CityMapper;

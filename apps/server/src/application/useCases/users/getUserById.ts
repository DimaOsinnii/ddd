import type { GetUserByIdUseCases } from '@application/useCases/users/IUserUseCases';

import { toUserDTO } from '@application/dto/user';
import { NotFoundError } from '../../../utils/errors/application';

const makeGetUserById: GetUserByIdUseCases = (userDataAccess) => async (id) => {
    const user = await userDataAccess.findById(id);

    if (!user) {
        throw new NotFoundError(`User with id ${id} was not found!`);
    }

    return toUserDTO(user);
};

export default makeGetUserById;

import { Controller } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CrudController, Crud } from '@nestjsx/crud';
import { UserService } from './user.service';

@Crud({
	model: {
		type: UserEntity
	},
	query: {
		cache: 2000,
		limit: 1,
		maxLimit: 100,
		exclude: ['password'],
		alwaysPaginate: true
	}
})
@Controller('users')
export class UserController implements CrudController<UserEntity> {
    constructor (public service: UserService) {}
}

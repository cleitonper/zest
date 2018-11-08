import { Schema } from 'mongoose';
import * as bcrypt from 'mongoose-bcrypt';
import * as beautifulValidation from 'mongoose-beautiful-unique-validation';

import { UserPermissions } from './types';

const options = {
  collection: 'users',
  versionKey: false,
  timestamps: true,
};

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The {PATH} field is required.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'The {PATH} field is required.'],
    lowercase: true,
    trim: true,
    index: true,
    unique: 'The email {VALUE} is already in use.',
    match: [/(^[a-z0-9]+[.\w]*@{1}[a-z0-9]+(\.[a-z]{2,4})+$)|(^$)/i, 'Invalid email address.'],
  },
  password: {
    type: String,
    required: [true, 'The {PATH} field is required.'],
    bcrypt: true,
  },
  permissions: {
    type: Object,
    default: { properties: ['read'] },
    validate: {
      validator: permissionValidator,
      message: (prop) => prop.reason.message,
    },
  },
}, options);

UserSchema.plugin(bcrypt);
UserSchema.plugin(beautifulValidation);

function permissionValidator(permissions: UserPermissions) {
  if ((typeof permissions) !== 'object' || Array.isArray(permissions)) {
    const type = Array.isArray(permissions) ? 'array' : typeof permissions;
    throw new Error(`permissions must be an object, but an ${type} was given.`);
  }

  if (!Object.keys(permissions).length) {
    throw new Error('permissions not be empty');
  }

  const validPermissions = ['read', 'write', 'delete'];

  for (const key of Object.keys(permissions)) {
    if (!Array.isArray(permissions[key])) {
      throw new Error(`${key} permissions must be an array.`);
    }

    if (!permissions[key].length) {
      throw new Error(`${key} permissions not be empty.`);
    }

    for (const permission of permissions[key]) {
      if (!validPermissions.includes(permission)) {
        throw new Error(`${permission} is not a valid permission.`);
      }
    }
  }

  return true;
}

export {
  UserSchema,
};
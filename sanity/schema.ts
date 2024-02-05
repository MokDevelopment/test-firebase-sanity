import { defineType, type SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    {
      name: 'user',
      title: 'User',
      type: 'document',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string'
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string'
        },
        {
          name: 'image',
          title: 'Image',
          type: 'url'
        },
        {
          // this is only if you use credentials provider
          name: 'password',
          type: 'string',
          hidden: true
        },
        {
          name: 'emailVerified',
          type: 'datetime',
          hidden: true,
        }
      ]
    },
    {
      name: 'account',
      title: 'Account',
      type: 'document',
      fields: [
        {
          name: 'providerType',
          type: 'string'
        },
        {
          name: 'providerId',
          type: 'string'
        },
        {
          name: 'providerAccountId',
          type: 'string'
        },
        {
          name: 'refreshToken',
          type: 'string'
        },
        {
          name: 'accessToken',
          type: 'string'
        },
        {
          name: 'accessTokenExpires',
          type: 'number'
        },
        {
          name: 'user',
          title: 'User',
          type: 'reference',
          to: { type: 'user' }
        }
      ]
    },
    {
      name: 'verification-token',
      title: 'Verification Token',
      type: 'document',
      fields: [
        {
          name: 'identifier',
          title: 'Identifier',
          type: 'string'
        },
        {
          name: 'token',
          title: 'Token',
          type: 'string'
        },
        {
          name: 'expires',
          title: 'Expires',
          type: 'datetime'
        }
      ]
    },
    {
      title: "Test",
      name: "test",
      type: "document",
      fields: [
        {
          title: "Greeting",
          name: "greeting",
          type: "string"
        }
      ]
    }  
  ],
}

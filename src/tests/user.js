import faker from 'faker'

/**
 * Factory method for generating random values for various attribute types
 * @param {String} type - Attribute which a random value needs to be generated
 * @returns {String}
 */
export const dataFactory = type => {
  const password = faker.internet.password()

  switch (type) {
    case 'email':
      return faker.internet.email().toLowerCase()
    case 'firstname':
      return faker.name.firstName()
    case 'lastName':
      return faker.name.lastName()
    case 'username':
      return faker.name.firstName()
    case 'password':
      return password
    default:
      return faker.random.words()
  }
}
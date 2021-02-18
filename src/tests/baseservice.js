import {expect} from 'chai'


import BaseService from '../services/baseservice';
import Contact from '../entities/contact';
import { realContact } from './testdata';


const ContactService = new BaseService(Contact)

describe('BaseService', () => {
  

  context('Create', () => {
    it('returns a promise of created Contact', done => {
      ContactService.create(realContact).then(savedUser => {
        expect(savedUser.email).to.equal(realContact.email)
        expect(savedUser.username).to.equal(realContact.username)
        done()
      })
    })
  })

  context('Index', () => {
    it('returns all contacts', done => {
      ContactService.index().then(contacts => {
        expect(contacts).to.be.instanceof(Array)
        expect(contacts.length).to.be.above(0)
        done()
      })
    })
  })

  context('Update', () => {
    it('updates contacts and returns updated todo', done => {
      ContactService.update({id: 1}, {email: 'getmob@gmail.com'}).then(updatedContact => {
        expect(updatedContact.title).to.equal('getmob@gmail.com')
        done()
      })
    })
  })

  context('Show', () => {
    it('returns a specified contact resource', done => {
      ContactService.show({id: 1}).then(todo => {
        expect(contact.email).to.equal('myemail@gmail.com')
        expect(contact).to.exist
        done()
      })
    })

    it('returns null for non-existing resource', () => {
      ContactService.show({id: 12}).then(todo => expect(contact).to.not.exist)
    })
  })

  context('Remove', () => {
    it('destroys to', done => {
      ContactService.destroy({id: 3}).then(todo => {
        expect(contact).to.not.exist
        done()
      })
    })
  })
})
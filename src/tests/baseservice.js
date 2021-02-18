import {expect} from 'chai'


import BaseService from '../services/baseservice';
import User from '../entities/user';
import Contact from '../entities/contact';
import {realTodo, fakeTodo, noNameTodo} from './testdata';


const UserService = new BaseService(User)

describe('BaseService', () => {
  

  context('Create', () => {
    it('returns a promise of created Todo', done => {
      UserService.create(realUser).then(savedUser => {
        expect(savedUser.email).to.equal(realUser.email)
        expect(savedUser.username).to.equal(realTodo.username)
        done()
      })
    })
  })

  context('Index', () => {
    it('returns all todos', done => {
      TodoService.index().then(todos => {
        expect(todos).to.be.instanceof(Array)
        expect(todos.length).to.be.above(0)
        done()
      })
    })
  })

  context('Update', () => {
    it('updates todo and returns updated todo', done => {
      TodoService.update({id: 1}, {title: 'Get Moby Dick'}).then(updatedTodo => {
        expect(updatedTodo.title).to.equal('Get Moby Dick')
        done()
      })
    })
  })

  context('Show', () => {
    it('returns a specified todo resource', done => {
      TodoService.show({id: 1}).then(todo => {
        expect(todo.title).to.equal('Get Moby Dick')
        expect(todo).to.exist
        done()
      })
    })

    it('returns null for non-existing resource', () => {
      TodoService.show({id: 12}).then(todo => expect(todo).to.not.exist)
    })
  })

  context('Destroy', () => {
    it('destroys todo', done => {
      TodoService.destroy({id: 3}).then(todo => {
          console.log('TODO', todo);
        expect(todo).to.not.exist
        done()
      })
    })
  })
})
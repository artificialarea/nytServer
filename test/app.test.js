const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../app');


describe('GET /books', () => {

  it('should return an array of books', () => {
     return supertest(app)
      .get('/books')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        // console.log(res.body[0]);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        const book = res.body[0];
        expect(book).to.include.all.keys(
          'bestsellers_date', 'author', 'description', 'title', 'rank', 'id'
        )
      });
  });

  it('should be 400 if sort is incorrect', () => {
    return supertest(app)
      .get('/books')
      // .query(!['title', 'rank'])
      .query({ sort: 'MISTAKE' })
      .expect(400, 'Sort must be one of title or rank');
  });

  it('should sort by title', () => {
    return supertest(app)
      .get('/books')
      .query({ sort: 'title'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then( res => {
        expect(res.body).to.be.an('array');
        
        let sorted = true;
        let i = 0;

        // iterate one less than the length of the array
        // because we're comparing 2 items in the array at once
        while (i < res.body.length - 1) {
          // compare book at 'i' with next book at 'i + 1'
          const bookAtI = res.body[i];
          const bookAtIPlus = res.body[i + 1];
          if (bookAtIPlus.title < bookAtI.title) {
            // books not sorted correctly, ergo:
            sorted = false;
            break; 
          }
          i++;
        }
        // ^^^^ alternate way to write above while statement
        // while(sorted && i < res.body.length - 1) {
        //   sorted = sorted && res.body[i].title < res.body[i + 1].title
        //   i++
        // }
        expect(sorted).to.be.true;
      });
  });
  
  it('should sort by rank', () => {
    return supertest(app)
      .get('/books')
      .query({ sort: 'rank'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then( res => {
        expect(res.body).to.be.an('array');
        
        let sorted = true;
        let i = 0;

        // iterate one less than the length of the array
        // because we're comparing 2 items in the array at once
        while (i < res.body.length - 1) {

          // compare book at 'i' with next book at 'i + 1'
          const bookAtI = res.body[i];
          const bookAtIPlus = res.body[i + 1];
          if (bookAtIPlus.rank < bookAtI.rank) {
            // books not sorted correctly, ergo:
            sorted = false;
            break; 
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });

});
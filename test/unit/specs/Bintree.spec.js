import Vue from 'vue'
import Hello from '@/util/bintree.js'

describe('bintree', () => {
    it('should create a binary search tree', () => {
        let bintree = new createBintree("root value");

        expect(bintree.getCardinality()).to.equal(1);
    })
})

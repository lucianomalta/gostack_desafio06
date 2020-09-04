import { getRepository, getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import { request } from 'express';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import Transactionsrepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute( { title, type, value, category }: Request): Promise<Transaction> {

    const trs = getCustomRepository(Transactionsrepository);

    const { total } = await trs.getBalance();

    if (type == 'outcome' && total < value) {
      throw new AppError('total is insuficient!');
    }

    // busco na categoria, se existe pego o id, senão crio
    const categoriesRepository = getRepository(Category);

    let idCategory  = await categoriesRepository.findOne( {
      where: { title: category },
    });

    if (!idCategory) {
      idCategory = categoriesRepository.create( {title: category} );

      await categoriesRepository.save(idCategory);
    }
  
    const transactionsRepository = getRepository(Transaction);

    const transaction = transactionsRepository.create( {title, type, value, category_id: idCategory.id} );

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;

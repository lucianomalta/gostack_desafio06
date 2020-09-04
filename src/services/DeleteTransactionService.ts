import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Transaction from "../models/Transaction";
import Transactionsrepository from '../repositories/TransactionsRepository';


class DeleteTransactionService {
  public async execute( id: string ): Promise<void> {

    const transactionsRepository = getCustomRepository(Transactionsrepository);

    const transaction  = await transactionsRepository.findOne( id );

    if (!transaction) {
      throw new AppError('Transaction is not found', 401);
    }
    
    await transactionsRepository.remove( transaction );

    return;
  }
}

export default DeleteTransactionService;

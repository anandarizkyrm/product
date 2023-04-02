import type { NextFunction, Request, Response } from 'express';
import { Product } from '../database/models/Product';

async function createProduct(req: Request, res: Response) {
  const data = req.body;

  try {
    const product: any = await Product.create(data);

    return res.status(201).send({
      status: 201,
      message: 'Created',
      data: product,
    });
  } catch (err: any) {
    return res.status(400).send({
      status: 400,
      message: err.message,
    });
  }
}

async function getAllProduct(req: Request, res: Response) {
  try {
    const product = await Product.findAll({
      where: {
        is_active: true,
      },
    });

    return res.status(200).send({
      status: 200,
      message: 'Success',
      data: product,
    });
  } catch (err: any) {
    return res.status(400).send({
      status: 400,
      message: err.message,
    });
  }
}

async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  try {
    delete data.is_active;

    const [rowsUpdated, [updatedProduct]] = await Product.update(data, {
      where: {
        id: id,
      },
      returning: true,
    });

    if (rowsUpdated === 0) {
      return res.status(404).send({
        status: 404,
        message: 'Not Found',
      });
    }

    return res.status(200).send({
      status: 200,
      message: 'Success',
      data: updatedProduct,
    });
  } catch (err: any) {
    return res.status(400).send({
      status: 400,
      message: err.message,
    });
  }
}

async function getById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const product = await Product.findOne({
      where: {
        id: id,
      },
    });

    if (!product) {
      return res.status(404).send({
        status: 404,
        message: 'Not Found',
      });
    }

    return res.status(200).send({
      status: 200,
      message: 'Success',
      data: product,
    });
  } catch (err: any) {
    return res.status(400).send({
      status: 400,
      message: err.message,
    });
  }
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const product = await Product.update(
      { is_active: false },
      {
        where: {
          id: id,
        },
      }
    );

    if (product[0] === 0) {
      return res.status(404).send({
        status: 404,
        message: 'Not Found',
      });
    }

    return res.status(200).send({
      status: 200,
      message: 'Success',
    });
  } catch (error: any) {
    return res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
}

export { createProduct, getAllProduct, deleteProduct, updateProduct, getById };

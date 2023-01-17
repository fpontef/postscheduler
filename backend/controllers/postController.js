import { asyncHandler } from '../middleware/errorHandlers.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

import { prisma } from '../database/prismaClient.js';

dayjs.extend(utc);

export const getPosts = asyncHandler(async (req, res) => {
  const allPosts = await prisma.post.findMany();

  res.status(200).json(allPosts);
});

const minimumScheduleTimeAllowed = (proposedSchedule, currentDate) => {
  const fiveMinutesFromCurrentDate = currentDate.add(5, 'minute');

  return proposedSchedule > fiveMinutesFromCurrentDate;
};

const maximumScheduleReached = (schedulesCount, maxSchedulesAllowed) => {
  return schedulesCount >= maxSchedulesAllowed;
};

export const createPost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;
  const { scheduledDate } = req.query || null;

  if (!title && !body) {
    res.status(400);
    throw new Error(
      'Por favor preencher corretamente o título e o corpo da postagem'
    );
  }

  if (!scheduledDate) {
    const newPostWithoutSchedule = await prisma.post.create({
      data: {
        title,
        body,
        published: true,
      },
    });

    return res.status(201).json(newPostWithoutSchedule);
  }

  const currentDate = dayjs().utc();
  const proposedSchedule = dayjs(scheduledDate).utc();

  if (!minimumScheduleTimeAllowed(proposedSchedule, currentDate)) {
    // return res.status(400).json({
    //   error: `Por favor escolha um tempo superior a 5 minutos`,
    // });

    res.status(400);
    throw new Error('Por favor escolha um tempo superior a 5 minutos');
  }

  const scheduledCountByDate = await prisma.post.count({
    where: {
      published: false,
      scheduledDate: {
        gt: currentDate.format(),
      },
    },
  });

  if (maximumScheduleReached(scheduledCountByDate, 3)) {
    res.status(400);
    throw new Error('O limite máximo de 3 postagens agendadas foi atingido');
  }

  const newPost = await prisma.post.create({
    data: {
      title,
      body,
      published: false,
      scheduledDate,
    },
  });

  return res.status(201).json(newPost);
});

export const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params || null;

  const deletedPost = await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  res.status(200).json(deletedPost.id);
});

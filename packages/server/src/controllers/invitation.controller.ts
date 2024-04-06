import { Router } from 'express';
import { Invitation } from '../entities';
import { PublicInvitationData } from '../types';
import { createInvitation } from '../utils';

const router = Router();

// retrieve all invitations
router.get('/', async (req, res) => {
  const invitations = await Invitation.findBy({ createdById: req.user!.id });

  res.send({
    invitations: invitations.map<PublicInvitationData>((i) =>
      i.getPublicInvitationData(),
    ),
  });
});

// generate invitation
router.post('/', async (req, res) => {
  const invitation = await createInvitation(req.user!);

  res.status(200).send(invitation.getPublicInvitationData());
});

// revoke invitation
router.delete('/:id', async (req, res) => {
  const invitation = await Invitation.findOneBy({
    id: parseInt(req.params.id),
  });

  if (!invitation) {
    res.sendStatus(400);
    return;
  }

  if (invitation.createdById !== req.user!.id) {
    res.sendStatus(401);
    return;
  }

  await invitation.remove();

  res.sendStatus(200);
});

export default router;

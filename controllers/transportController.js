const Transport = require('../models/Transport');

exports.createTransport = async (req, res) => {
    const transport = new Transport({
        ...req.body,
        owner: req.user._id
    });

    try {
        await transport.save();
        res.status(201).send(transport);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getTransports = async (req, res) => {
    try {
        const transports = await Transport.find({});
        res.send(transports);
    } catch (error) {
        res.status(500).send();
    }
};

exports.deleteTransport = async (req, res) => {
  console.log('DELETE request received');
  console.log('Transport ID:', req.params.id);

  try {
    const transport = await Transport.findOne({ _id: req.params.id });

    if (!transport) {
      console.log('Transport not found in findOne');
      return res.status(404).send({ error: 'Transport not found.' });
    }

    console.log('Transport found:', transport);

    const deletedTransport = await Transport.findByIdAndDelete(req.params.id);

    if (!deletedTransport) {
      console.log('Transport not found in findByIdAndDelete');
      return res.status(404).send({ error: 'Transport not found.' });
    }

    res.send(deletedTransport);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

exports.reserveTransport = async (req, res) => {
  try {
    const transport = await Transport.findOne({ _id: req.params.id });

    if (!transport) {
      return res.status(404).send();
    }

    // Create a new reservation object with the provided dates and city
    const newReservation = {
      cityStart: req.body.cityStart,
      dateStart: req.body.startDate,
      cityReturn: req.body.cityReturn,
      dateReturn: req.body.endDate,
    };

    // Add the new reservation to the transport's reservations array
    transport.reservations.push(newReservation);

    await transport.save();
    res.send(transport);
  } catch (error) {
    res.status(500).send();
  }
};


exports.search = async (req, res) => {
  try {
    const { pickupCity, returnCity, pickupDate, returnDate, transportType } = req.body;

    const transports = await Transport.find({
      baseLocation: pickupCity,
      type: transportType,
    });

    const availableTransports = transports.filter((transport) => {
      const overlappingReservations = transport.reservations.filter((reservation) => {
        const reservationStartDate = new Date(reservation.dateStart);
        const reservationReturnDate = new Date(reservation.dateReturn);
        return !(
          (new Date(pickupDate) >= reservationReturnDate) ||
          (new Date(returnDate) <= reservationStartDate)
        );
      });

      return overlappingReservations.length === 0;
    });

    res.json(availableTransports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateTransport = async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id);

    if (!transport) {
      return res.status(404).send({ error: 'Transport not found.' });
    }

    if (req.body.action === 'removeReservation') {
      const { startDate, endDate } = req.body;

      transport.reservations = transport.reservations.filter(
        (reservation) =>
          reservation.dateStart !== startDate || reservation.dateReturn !== endDate
      );

      await transport.save();
      res.status(200).send(transport);
    } else {
      res.status(400).send({ error: 'Invalid action.' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.removeReservation = async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id);

    if (!transport) {
      return res.status(404).send({ error: 'Transport not found' });
    }

    transport.reservations = transport.reservations.filter(
      reservation =>
        !(
          reservation.dateStart.toISOString() === req.body.startDate &&
          reservation.dateReturn.toISOString() === req.body.endDate
        )
    );

    await transport.save();
    res.send(transport);
  } catch (error) {
    console.error('Error:', error);
    res.status(400).send({ error: 'Error removing reservation' });
  }
};



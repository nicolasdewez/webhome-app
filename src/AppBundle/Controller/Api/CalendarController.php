<?php

namespace AppBundle\Controller\Api;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class CalendarController.
 *
 * @Route("/cald")
 */
class CalendarController extends Controller
{
    /**
     * @return Response
     *
     * @Route("/calendars", name="api_cald_calendars", methods="GET")
     */
    public function calendarsAction()
    {
        $calendars = $this->get('webhome_calendar.client')->calendars();

        return new Response(
            $this->get('serializer')->serialize($calendars, 'json'),
            Response::HTTP_OK,
            ['content-type' => 'application/json']
        );
    }
}

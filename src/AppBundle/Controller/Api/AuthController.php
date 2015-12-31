<?php

namespace AppBundle\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class AuthController.
 *
 * @Route("/auth")
 */
class AuthController extends Controller
{
    /**
     * @return Response
     *
     * @Route("/user", name="api_auth_user", methods="GET")
     */
    public function userAction()
    {
        return new Response(
            $this->get('serializer')->serialize($this->getUser(), 'json'),
            Response::HTTP_OK,
            ['content-type' => 'application/json']
        );
    }
}

#update your composer
composer require knplabs/knp-menu-bundle:"~2"

#Register Bundle To AppKernel.php
new Knp\Bundle\MenuBundle\KnpMenuBundle(),

{{ knp_menu_render('main', {'currentClass': 'active', 'template': 'FrontBundle::knp_menu.html.twig'}) }} 

#config.yml
knp_menu:
    # use "twig: false" to disable the Twig extension and the TwigRenderer
    twig:
        template: knp_menu.html.twig
    #  if true, enables the helper for PHP templates
    templating: true
    # the renderer to use, list is also available by default
    default_renderer: twig
    providers:
        builder_alias: false    # disable the builder-based provider
        container_aware: true

#services.yml
services:
    front.menu_builder:
        class: FrontBundle\Menu\MenuBuilder
        arguments: ["@knp_menu.factory", '@security.context']

    front.main_menu:
        class: Knp\Menu\MenuItem # the service definition requires setting the class
        factory: ["@front.menu_builder", createMainMenu]
        arguments: ["@request_stack"]
        tags:
            - { name: knp_menu.menu, alias: main }

#Admin LTE
{% extends 'knp_menu.html.twig' %}

{% block item %}
{% import "knp_menu.html.twig" as macros %}

{% if item.displayed %}
    {%- set attributes = item.attributes %}
    {%- set is_dropdown = attributes.dropdown|default(false) %}
    {%- set divider_prepend = attributes.divider_prepend|default(false) %}
    {%- set divider_append = attributes.divider_append|default(false) %}

{# unset bootstrap specific attributes #}
    {%- set attributes = attributes|merge({'dropdown': null, 'divider_prepend': null, 'divider_append': null }) %}

    {%- if divider_prepend %}
        {{ block('dividerElement') }}
    {%- endif %}

{# building the class of the item #}
    {%- set classes = item.attribute('class') is not empty ? [item.attribute('class')] : [] %}
    {%- if matcher.isCurrent(item) %}
        {%- set classes = classes|merge([options.currentClass]) %}
    {%- elseif matcher.isAncestor(item, options.depth) %}
        {%- set classes = classes|merge([options.currentClass]) %}
    {%- endif %}
    {%- if item.actsLikeFirst %}
        {%- set classes = classes|merge([options.firstClass]) %}
    {%- endif %}
    {%- if item.actsLikeLast %}
        {%- set classes = classes|merge([options.lastClass]) %}
    {%- endif %}

{# building the class of the children #}
    {%- set childrenClasses = item.childrenAttribute('class') is not empty ? [item.childrenAttribute('class')] : [] %}
    {%- set childrenClasses = childrenClasses|merge(['treeview-menu']) %}

{# adding classes for dropdown #}
    {%- if is_dropdown %}
        {%- set classes = classes|merge(['']) %}
        {%- set childrenClasses = childrenClasses|merge(['']) %}
    {%- endif %}

{# putting classes together #}
    {%- if classes is not empty %}
        {%- set attributes = attributes|merge({'class': classes|join(' ')}) %}
    {%- endif %}
    {%- set listAttributes = item.childrenAttributes|merge({'class': childrenClasses|join(' ') }) %}

{# displaying the item #}
    <li{{ macros.attributes(attributes) }}>
        {%- if is_dropdown %}
            {{ block('dropdownElement') }}
        {%- elseif item.uri is not empty and (not item.current or options.currentAsLink) %}
            {{ block('linkElement') }}
        {%- else %}
            {{ block('spanElement') }}
        {%- endif %}
{# render the list of children#}
        {{ block('list') }}
    </li>

    {%- if divider_append %}
        {{ block('dividerElement') }}
    {%- endif %}
{% endif %}
{% endblock %}

{% block dividerElement %}
{% if item.level == 1 %}
    <li class="divider-vertical"></li>
{% else %}
    <li class="divider"></li>
{% endif %}
{% endblock %}

{% block linkElement %}
    <a href="{{ item.uri }}"{{ macros.attributes(item.linkAttributes) }}>
        {% if item.attribute('icon') is not empty  %}
            <i class="{{ item.attribute('icon') }}"></i> 
        {% endif %}
        {{ block('label') }}
    </a>
{% endblock %}

{% block spanElement %}
    <span>{{ macros.attributes(item.labelAttributes) }}>
        {% if item.attribute('icon') is not empty  %}
            <i class="{{ item.attribute('icon') }}"></i> 
        {% endif %}
        {{ block('label') }}
    </span>
{% endblock %}

{% block dropdownElement %}
    {%- set classes = item.linkAttribute('class') is not empty ? [item.linkAttribute('class')] : [] %}
    {%- set classes = classes|merge(['dropdown-toggle']) %}
    {%- set attributes = item.linkAttributes %}
    {%- set attributes = attributes|merge({'class': classes|join(' ')}) %}
    {%- set attributes = attributes|merge({'data-toggle': 'dropdown'}) %}
    <a href="javascript:;">
        {% if item.attribute('icon') is not empty  %}
            <i class="{{ item.attribute('icon') }}"></i> 
        {% endif %}
        {{ block('label') }} 

{% endblock %}

{% block label %}{{ item.label|trans }}{% endblock %}


#back menubuilder

<?php
namespace FrontBundle\Menu;

use Knp\Menu\FactoryInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\SecurityContextInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class MenuBuilder
{
     private $factory;
     protected $securityContext;


    /**
     * @param FactoryInterface $factory
     * @param SecurityContextInterface $securityContext
     */
    public function __construct(FactoryInterface $factory,SecurityContextInterface $securityContext)
    {
        $this ->factory = $factory;
        $this ->securityContext = $securityContext;

    }

    public function createMainMenu(RequestStack $requestStack)
    {
        $menu = $this->factory->createItem('root');
        $menu->setChildrenAttribute('class', 'nav');
        $menu->addChild('Home', array('route' => 'home'));
        $menu->addChild('Blog', array('route' => 'blog_all'));
        
        if($securityContext->isGranted('IS_AUTHENTICATED_REMEMBERED'))
        {
            if($securityContext->isGranted('ROLE_ADMIN'))
            {
                $menu->addChild('Admin Dashboard', array('route' => 'back_homepage'));
            }

            $menu->addChild('Logout', array('route' => 'fos_user_security_logout'));           
        }

        else
        {
            $menu->addChild('Register', array('route' => 'fos_user_registration_register'));
            $menu->addChild('Login', array('route' => 'fos_user_security_login'));
        }

        return $menu;
    }

}

#front menubuilder
{% extends 'knp_menu.html.twig' %}

{% block item %}
{% import "knp_menu.html.twig" as macros %}
{% if item.displayed %}
    {%- set attributes = item.attributes %}
    {%- set is_dropdown = attributes.dropdown|default(false) %}
    {%- set divider_prepend = attributes.divider_prepend|default(false) %}
    {%- set divider_append = attributes.divider_append|default(false) %}

{# unset bootstrap specific attributes #}
    {%- set attributes = attributes|merge({'dropdown': null, 'divider_prepend': null, 'divider_append': null }) %}

    {%- if divider_prepend %}
        {{ block('dividerElement') }}
    {%- endif %}

{# building the class of the item #}
    {%- set classes = item.attribute('class') is not empty ? [item.attribute('class')] : [] %}
    {%- if matcher.isCurrent(item) %}
        {%- set classes = classes|merge([options.currentClass]) %}
    {%- elseif matcher.isAncestor(item, options.depth) %}
        {%- set classes = classes|merge([options.ancestorClass]) %}
    {%- endif %}
    {%- if item.actsLikeFirst %}
        {%- set classes = classes|merge([options.firstClass]) %}
    {%- endif %}
    {%- if item.actsLikeLast %}
        {%- set classes = classes|merge([options.lastClass]) %}
    {%- endif %}

{# building the class of the children #}
    {%- set childrenClasses = item.childrenAttribute('class') is not empty ? [item.childrenAttribute('class')] : [] %}
    {%- set childrenClasses = childrenClasses|merge(['menu_level_' ~ item.level]) %}

{# adding classes for dropdown #}
    {%- if is_dropdown %}
        {%- set classes = classes|merge(['dropdown']) %}
        {%- set childrenClasses = childrenClasses|merge(['dropdown-menu']) %}
    {%- endif %}

{# putting classes together #}
    {%- if classes is not empty %}
        {%- set attributes = attributes|merge({'class': classes|join(' ')}) %}
    {%- endif %}
    {%- set listAttributes = item.childrenAttributes|merge({'class': childrenClasses|join(' ') }) %}

{# displaying the item #}
    <li{{ macros.attributes(attributes) }}>
        {%- if is_dropdown %}
            {{ block('dropdownElement') }}
        {%- elseif item.uri is not empty and (not item.current or options.currentAsLink) %}
            {{ block('linkElement') }}
        {%- else %}
            {{ block('spanElement') }}
        {%- endif %}
{# render the list of children#}
        {{ block('list') }}
    </li>

    {%- if divider_append %}
        {{ block('dividerElement') }}
    {%- endif %}
{% endif %}
{% endblock %}

{% block dividerElement %}
{% if item.level == 1 %}
    <li class="divider-vertical"></li>
{% else %}
    <li class="divider"></li>
{% endif %}
{% endblock %}

{% block linkElement %}
    <a href="{{ item.uri }}"{{ macros.attributes(item.linkAttributes) }}>
        {% if item.attribute('icon') is not empty  %}
            <i class="{{ item.attribute('icon') }}"></i> 
        {% endif %}
        {{ block('label') }}
    </a>
{% endblock %}

{% block spanElement %}
    <span>{{ macros.attributes(item.labelAttributes) }}>
        {% if item.attribute('icon') is not empty  %}
            <i class="{{ item.attribute('icon') }}"></i> 
        {% endif %}
        {{ block('label') }}
    </span>
{% endblock %}

{% block dropdownElement %}
    {%- set classes = item.linkAttribute('class') is not empty ? [item.linkAttribute('class')] : [] %}
    {%- set classes = classes|merge(['dropdown-toggle']) %}
    {%- set attributes = item.linkAttributes %}
    {%- set attributes = attributes|merge({'class': classes|join(' ')}) %}
    {%- set attributes = attributes|merge({'data-toggle': 'dropdown'}) %}
    <a href="#"{{ macros.attributes(attributes) }}>
        {% if item.attribute('icon') is not empty  %}
            <i class="{{ item.attribute('icon') }}"></i> 
        {% endif %}
        {{ block('label') }} 
        <b class="caret"></b>
    </a>
{% endblock %}

{% block label %}{{ item.label|trans }}{% endblock %}


public function createMainMenu(RequestStack $requestStack)
{
    $menu = $this->factory->createItem('root');
    $menu->setChildrenAttribute('class', 'nav');
    $menu->addChild('Home', array('route' => 'home'));
    $menu->addChild('Blog', array('route' => 'blog_all'));
    $menu->addChild('Register', array('route' => 'fos_user_registration_register'));
    $menu->addChild('Login', array('route' => 'fos_user_security_login'));
    return $menu;
}
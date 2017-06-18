var App = App || {},
    $body = $('body'),
    $loading = $('#loader');

$.extend(App, {
    api: 'https://pokeapi.co',

    call: function (endpoint) {
        $.get(App.api + endpoint, function (res) {
            App.events.populate(res.objects);
            App.events.fixPagination(res.meta);
        });

        return null;
    },

    events: {
        fixPagination: function (meta) {
            var $next = $('nav ul.pager li.next a'),
                $prev = $('nav ul.pager li.previous a');

            if (meta.next != null) {
                $next.attr('href', meta.next).parents('li').removeClass('disabled');
            } else {
                $next.parents('li').addClass('disabled');
            }

            if (meta.previous != null) {
                $prev.attr('href', meta.previous).parents('li').removeClass('disabled');
            } else {
                $prev.parents('li').addClass('disabled');
            }
        },

        navigate: function (e) {
            e.preventDefault();

            if (!$(e.target).parents('li').hasClass('disabled')) {
                var link = $(e.target).attr('href');

                App.call(link);
            }

            return false;
        },

        populate: function (list) {
            if (list.length < 1) {
                console.error('Not enough pokemon');
                return;
            }

            App.pokemon = list;

            var $table = $('#pokemon-list tbody');

            $table.empty();

            $.each(App.pokemon, function (index, pokemon) {
                $table.append(App.views.listItem(index, pokemon));
            });
        },

        select: function (e) {
            var pokemonIndex = $(e.relatedTarget).attr('data-pokemon'),
                $pokemon = App.select(pokemonIndex),
                $modal = $('#detail');

            $modal.find('[data-name]').text($pokemon.name);
            $modal.find('[data-attack]').text($pokemon.attack);
            $modal.find('[data-defence]').text($pokemon.defence);
            $modal.find('[data-speed]').text($pokemon.speed);
            $modal.find('[data-hp]').text($pokemon.hp);
            $modal.find('[data-image]').attr('src', 'https://github.com/PokeAPI/pokeapi/blob/master/data/v2/sprites/pokemon/' + $pokemon.pkdx_id + '.png?raw=true');

            $modal.find('[data-evolutions]').empty();
            $modal.find('[data-evolutions]').html(App.views.evolutions($pokemon));
        }
    },

    init: function () {
        console.info('The application is ready.');

        App.call('/api/v1/pokemon?limit=10');
    },

    list: function () {
        return App.pokemon;
    },

    meta: {},

    pokemon: [],

    select: function (index) {
        return App.pokemon[index];
    },

    views: {
        listItem: function (index, item) {
            return '<tr>' +
                '<td>' + item.pkdx_id + '</td>' +
                '<td><img src="https://github.com/PokeAPI/pokeapi/blob/master/data/v2/sprites/pokemon/' + item.pkdx_id + '.png?raw=true" class="rotate"></td>' +
                '<td>' + item.name + '</td>' +
                '<td>' + item.hp + '</td>' +
                '<td><a href="#" data-toggle="modal" data-target="#detail" data-pokemon="' + index + '"><i class="glyphicon glyphicon-search"></i> View</a></td>' +
                '</tr>';
        },

        evolutions: function (item) {
            if (item.evolutions.length < 1) {
                $('.evolution-title').hide();
                return '';
            }

            var evolutions = {};

            $.each(item.evolutions, function (index, pokemon) {
                var str = pokemon.resource_uri;
                var res = str.match(/\/.+\/(\d+)\//);

                evolutions[pokemon.to] = '<li>' +
                    '<img src="https://github.com/PokeAPI/pokeapi/blob/master/data/v2/sprites/pokemon/' + res[1] + '.png?raw=true">' +
                    pokemon.to +
                    '</li>';
            });

            var template = [];
            $.map(evolutions, function (value, index) {
                template.push(value);
            });

            $('.evolution-title').show();
            
            return template.join('');
        }
    }
});

$(document)
    .ready(function () {
        App.init();

        $body
            .on('show.bs.modal', '#detail', App.events.select)
            .on('click', 'nav ul.pager li a', App.events.navigate);
    })
    .ajaxStart(function () {
        $loading.show();
    })
    .ajaxStop(function () {
        $('footer').show();
        $('#pokemon-list').show();
        $('nav').show();
        $loading.hide();
    });

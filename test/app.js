describe('App', function () {
    it('should call() api successfully', function () {
        var err = App.call('/pokemon/1');

        expect(err).to.be.null;
    });

    before(function () {
        // API is slow so we are manually mocking the call function.
        App.pokemon = [];
        App.pokemon.push({
            name: 'Bulbasaur'
        });
    });

    it('should list() pokemon', function () {
        var list = App.list();

        expect(list).to.be.array;
        expect(list.length).to.be.gt(0);
    });

    it('should select() pokemon', function () {
        var pokemon = App.select(0);

        expect(pokemon).not.to.be.null;
        expect(pokemon.name).to.equal('Bulbasaur');
    });
});


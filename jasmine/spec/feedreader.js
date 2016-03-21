// feedreader.js where jasmine tests go
/**   all of our tests go in the $() function to ensure
 *   no test run until the DOM is ready.
 **/
$(function() {
    /* a test suite checking the RSS Reeds */
    describe('RSS Feeds', function() {
        /**   tests to make sure that the allFeeds variable
         *   has been defined and that it is not empty.
         **/
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /**   loop through each feed in the allFeeds
         *   object and ensures it has a URL defined
         *   and that the URL is not empty.
         **/

        it('has items with URLS', function() {
            for (var item in allFeeds) {
                expect(allFeeds[item].url).toBeDefined();
                expect(allFeeds[item].url).not.toBe(0);
            }
        });

        /**   loops through each feed in the allFeeds object
         *   & ensures it has a name defined
         *   & that the name is not empty.
         *   & that it's a string
         */

        it('has items with names', function() {
            for (var item in allFeeds) {
                expect(allFeeds[item].name).toBeDefined();
                expect(allFeeds[item].name).not.toBe(0);
                expect(typeof allFeeds[item].name).toBe('string');
            }
        });
    });


    /* a test suite named "The menu" */
    describe('The menu', function() {
        var menuHide = $('body').hasClass('menu-hidden');

        /**   ensures the menu element is hidden by default
         *   as if 'true' the body has that menu-hidden class
         **/

        it('is hidden initally', function() {
            expect(menuHide).toEqual(true);
        });

        /**   shows that clicking the menu icon
         *   toggles the body having and then not having
         *   and then having the menu-hidden class again
         **/

        it('toggles visibility on click', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

    }); // from the menu test suite

    /* test suite named "Initial Entries" */
    describe('Inital Enteries', function() {

        // beforeEach waits to the async call to loadFeed to finish
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /** check to see that there is a feed in the feed container
         * & if it is defined that it also is one or greater
         **/
        it('has at least one within feed container', function() {
            var $entry = $('.entry');
            expect($entry).toBeDefined();
            expect($entry.length).toBeGreaterThan(0);
        });
    }); // from inital Enteries suite

    /* a test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var firstFeed, secondFeed;

        // beforeEach calls a feed and stores html into var FirstFeed
        beforeEach(function(done) {
            loadFeed(1, function() {
                firstFeed = $('.feed').html();
                loadFeed(2, function() {
                    done();
                });
            });
        });

        // afterEach reloads first entry
        afterEach(function() {
            loadFeed(0);
        });

        /**  ensures when a new feed is loaded by loadFeed()
         *  function that the content actually changes
         **/
        it('is different than last feed', function() {
            expect(firstFeed).toBeDefined();
            secondFeed = $('.feed').html();
            expect(secondFeed).toBeDefined();
            expect(firstFeed).not.toEqual(secondFeed);
        });

    }); // from new feed selection suite


}());

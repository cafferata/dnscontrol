describe('Broken Link', () => {
  const navLinks = 'nav-links.txt';

  it('clear ' + navLinks, () => {
    cy.writeFile(
      navLinks,
      '',
    );
  });

  const urls = [
    '/',
    '/language-reference/top-level-functions',
    '/language-reference/domain-modifiers',
    '/language-reference/record-modifiers/service-provider-specific/amazon-route-53',
    '/service-providers/providers',
  ];
  for (const url of urls) {
    it('get all nav links: ' + url, () => {
      cy.visit('https://docs.dnscontrol.org' + url);
      cy.get('nav a').each(link => {
        if (link.prop('href'))
          cy.writeFile(
            navLinks,
            link.prop('href') + '\n',
            {
              flag: 'a+',
            },
          );
      });
    });
  }
});
